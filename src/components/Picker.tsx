import React, {Component} from "react";
import {throttle} from "lodash"
import Color from "color";


type PickerProps = {
  size: number,
  color: Color,
  onChange: (color: Color) => void
}

export class Picker extends Component<PickerProps> {
  throttle = throttle((fn, data, func) => fn(data, func), 20)
  ref: HTMLCanvasElement | null = null
  picker : CanvasPicker | null = null
  
  componentWillUnmount() {
    this.throttle.cancel()
    this.unbindEventListeners()
  }
  
  componentDidMount() {
    if (!this.ref) return
    this.picker = new CanvasPicker(this.props.size, this.ref, this.props.color)
    this.picker.draw()
  }
  
  componentDidUpdate(prevProps: Readonly<PickerProps>, prevState: Readonly<{}>, snapshot?: any) {
    if (!this.picker) return
    this.picker.color = this.props.color
    this.picker.draw()
  }
  
  handleChange = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | Event) => {
    if (!this.picker) return
    typeof this.props.onChange === 'function' && this.throttle(
      this.picker.mouseDownEventHandler,
      e, this.props.onChange
    )
  }
  
  
  handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    this.handleChange(e)
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }
  
  handleMouseUp = () => {
    this.unbindEventListeners()
    if (!this.picker) return
    this.picker.handleMouseUp()
  }
  
  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
  
  render() {
    return (
      <canvas style={{imageRendering: "pixelated"}}
        height={this.props.size}
        width={this.props.size}
        onMouseDown={this.handleMouseDown}
        ref={ref => this.ref = ref}
      />
    )
  }
}


interface Position {
  x: number,
  y: number
}

enum Drag {
  wheel,
  quad,
  none
}


class CanvasPicker {
  private wheel : Wheel
  private size : number
  private canvas : HTMLCanvasElement
  private quad : Quad
  public color : Color
  private wheelCursor : WheelCursor
  private quadCursor : QuadCursor
  public drag : Drag = Drag.none
  
  constructor(size: number, canvas : HTMLCanvasElement, color: Color) {
    this.size = size
    this.wheel = new Wheel(this.size, 22)
    this.quad = new Quad(this.wheel)
    this.wheelCursor = new WheelCursor(this.wheel)
    this.quadCursor = new QuadCursor(4, 2)
    this.canvas = canvas
    this.color = color
  }
  
  private getEventDot = (e: any | Event | undefined ) => {
    
    e = e || window.event;
    var x, y;
    var scrollX = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollY = document.body.scrollTop + document.documentElement.scrollTop;
    
    if (e.type === 'touchend') {
      
      x = e.changedTouches[0].clientX + scrollX;
      y = e.changedTouches[0].clientY + scrollY;
      
    } else if (e.type === 'touchmove' || e.touches) {
      
      x = e.touches[0].clientX + scrollX;
      y = e.touches[0].clientY + scrollY;
      
    } else {
      // e.pageX e.pageY e.x e.y bad for cross-browser
      x = e.clientX + scrollX;
      y = e.clientY + scrollY;
    }
    
    // set point to local coordinates
    
    var rect = this.canvas.getBoundingClientRect();
    x -= rect.left + scrollX;
    y -= rect.top + scrollY;
    
    return {x: x, y: y};
  }
  
  private hueByDot = (dot: Position) => {
    let angle = this.getAngle(dot, this.wheel.pos, false) + this.wheel.hAngle
    if (angle < 0)
      angle = 360 + angle
    
    return angle
  }
  
  private getAngle(point: Position, from: Position, translate360: boolean) {
    if (!from)
      from = {x: 0, y: 0}
    
    const distX = point.x - from.x
    const distY = point.y - from.y
    
    let angle = Math.atan2(distY, distX) * 180 / Math.PI
    if (translate360 && angle < 0) {
      angle = 360 + angle
    }
    
    return angle
  }
  
  public mouseDownEventHandler = (e : any | Event | undefined, onChange: (color: Color) => void) => {
    e.preventDefault()
    let mousePosition = this.getEventDot(e)
  
    switch (this.drag) {
      case Drag.none:
        if (this.wheel.isDotIn(mousePosition)) {
          this.drag = Drag.wheel
          const hue = this.hueByDot(mousePosition)
          this.color = this.color.hue(hue)
          onChange(this.color)
          this.draw()
        } else if (this.quad.isDotIn(mousePosition)) {
          this.drag = Drag.quad
          const saturation = this.quad.dotToSaturation(mousePosition)
          const value = this.quad.dotToValue(mousePosition)
          this.color = this.color.saturationv(saturation * 100).value(value * 100)
          onChange(this.color)
          this.draw()
        }
        break;
        
      case Drag.wheel:
        const hue = this.hueByDot(mousePosition)
        this.color = this.color.hue(hue)
        onChange(this.color)
        this.draw()
        break;
        
      case Drag.quad:
        const saturation = this.quad.dotToSaturation(mousePosition)
        const value = this.quad.dotToValue(mousePosition)
        this.color = this.color.saturationv(saturation * 100).value(value * 100)
        onChange(this.color)
        this.draw()
        break;
    }
  
  
  }
  
  
  public handleMouseUp = () => {
    this.drag = Drag.none
  }
  
  public draw() {
    const ctx = this.canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    
    
    this.wheel.draw(this.canvas)
    this.quad.draw(this.canvas, this.color.hue())
    this.wheelCursor.draw(this.canvas, this.color.hue())
    const dot = this.quad.saturationValueToDot(this.color.saturationv() , this.color.value())
    this.quadCursor.draw(this.canvas, this.color, dot)
  }
  
  
}



class Wheel {
  public readonly outerRadius: number
  public readonly innerRadius: number
  public readonly center: number
  public hAngle: number
  public readonly pos: Position
  private renderedWheel: ImageData | null = null
  
  constructor(public size: number, public width: number) {
    this.center = size / 2
    this.outerRadius = size / 2
    this.innerRadius = size / 2 - width
    this.hAngle = 0;
    this.pos = {x: this.center, y: this.center}
  }
  
  public draw = (canvas: HTMLCanvasElement) => {
    const startHAngle = this.hAngle
    const ctx = canvas.getContext('2d')
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false
    if (this.renderedWheel) {
      ctx.putImageData(this.renderedWheel, 0, 0);
      return
    }
    for (let angle = 0; angle <= 360; angle++) {
      const startAngle = (angle - 2) * Math.PI / 180;
      const endAngle = (angle) * Math.PI / 180;
      
      ctx.beginPath()
      ctx.moveTo(this.center, this.center);
      ctx.arc(this.center, this.center, this.outerRadius, startAngle, endAngle, false)
      ctx.closePath()
      
      const targetColor = Color().hsv(this.hAngle, 100, 100);
      ctx.fillStyle = `rgb(${targetColor.red()}, ${targetColor.green()}, ${targetColor.blue()} )`
      
      ctx.fill()
      
      this.hAngle++
      if (this.hAngle >= 360)
        this.hAngle = 0
      
    }
    
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(this.center, this.center, this.innerRadius, 0, Math.PI * 2)
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    this.hAngle = startHAngle
    ctx.closePath()
  }
  
  public isDotIn = (dot: Position) => {
    // is dot in circle
    if (Math.pow(this.pos.x - dot.x, 2) + Math.pow(this.pos.y - dot.y, 2) < Math.pow(this.outerRadius, 2)) {
      if (Math.pow(this.pos.x - dot.x, 2) + Math.pow(this.pos.y - dot.y, 2) > Math.pow(this.innerRadius, 2)) {
        return true;
      }
    }
    return false;
  };
  
  
}

class QuadCursor {
  private radius : number
  private lineWidth : number
  constructor(radius: number, lineWidth : number) {
    this.radius = radius
    this.lineWidth = lineWidth
  }
  
  
  
  public draw = (canvas : HTMLCanvasElement, color: Color, dot : Position) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.arc(dot.x, dot.y, this.radius, 0, Math.PI * 2);
  
  
    ctx.stroke();
    ctx.closePath();
  }
}

class WheelCursor {
  public path: Position[]
  lineWeight = 2;
  height = 4;
  paddingX = 2;
  wheel: Wheel
  
  constructor(wheel: Wheel, lineWeight = 3, height = 1, paddingX = 0 ) {
    this.lineWeight = lineWeight;
    this.height = height;
    this.paddingX = paddingX;
    this.wheel = wheel
    this.path = this.getPath()
  }
  
  private getPath = () => {
    return [
      {x: this.wheel.innerRadius - this.paddingX, y: -this.height},
      {x: this.wheel.outerRadius + this.paddingX, y: -this.height},
      {x: this.wheel.outerRadius + this.paddingX, y: this.height},
      {x: this.wheel.innerRadius - this.paddingX, y: this.height},
      {x: this.wheel.innerRadius - this.paddingX, y: (this.height - (this.lineWeight / 2))}
    ]
  }
  private rotatePath = (points: Position[], angle: number) => {
    angle = toRadians(angle);
    return points.map((point) => ({
        x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
        y: point.x * Math.sin(angle) + point.y * Math.cos(angle)
      }
    ))
  }
  
  public draw = (canvas: HTMLCanvasElement, hue: number) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let wheelCursorPath = this.rotatePath(this.path, hue )
    //let wheelCursorPath = this.path

    for (let i = 0; i <= wheelCursorPath.length -1; i++)
    {
      wheelCursorPath[i].x += this.wheel.pos.x
      wheelCursorPath[i].y += this.wheel.pos.y
      
      if (i === 0) ctx.moveTo(wheelCursorPath[i].x, wheelCursorPath[i].y)
      else ctx.lineTo(wheelCursorPath[i].x, wheelCursorPath[i].y)
    }
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = this.lineWeight;
    ctx.stroke();
    ctx.closePath();
  }
}



class Quad {
  private size : number
  private padding : number
  private path : Position []
  private renderedQuad : ImageData | null = null
  private previosHue : number = 0
  
  constructor(wheel: Wheel) {
    this.padding = 2
    const workD = wheel.innerRadius * 2 - this.padding * 2
    
    this.size = Math.floor(workD /Math.sqrt(2))
    this.path = []
    this.path[0] = {x: -1 * (this.size / 2), y: -1 * (this.size / 2)};
    this.path[1] = {x: this.path[0].x + this.size, y: this.path[0].y};
    this.path[2] = {x: this.path[1].x, y: this.path[1].y + this.size};
    this.path[3] = {x: this.path[2].x - this.size, y: this.path[2].y};
    this.path[4] = {x: this.path[0].x, y: this.path[0].y};
  
    for (let i = 0; i <= this.path.length - 1; ++i) {
      this.path[i].x += wheel.pos.x;
      this.path[i].y += wheel.pos.y;
    }
  }
  
  public isDotIn = (dot: Position) => {
    return !(dot.x < this.path[0].x ||
      dot.x > this.path[0].x + this.size ||
      dot.y < this.path[0].y ||
      dot.y > this.path[0].y + this.size);
    
  }
  
  public dotToSaturation = (dot: Position) => {
    const relationalX = this.path[3].x - dot.x
    const absX = Math.abs(relationalX > 0 ? 0 : relationalX)
    return absX / this.size
  }
  
  public dotToValue = (dot: Position)  => {
    const relationalY = this.path[3].y - dot.y
    const absY = Math.abs(relationalY < 0 ? 0 : relationalY)
    return absY /this.size
  }
  
  public saturationValueToDot = (saturation: number, value: number) => {

    const quadX = this.path[0].x
    const quadY = this.path[2].y
    
    return {
      x: Math.floor(saturation/100 * this.size + quadX),
      y: Math.floor(-value/100 * this.size + quadY),
    }
  }
  
  public draw = (canvas : HTMLCanvasElement, hue: number) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    if (!this.renderedQuad)
      this.renderedQuad = ctx.createImageData(this.size, this.size)
    
    const quadX = this.path[0].x
    const quadY = this.path[0].y
    
    if(this.previosHue !== hue) {
      
  
      let i = 0
  
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          const dot = {x: x + quadX, y: y + quadY}
          const color = hsvToRgb(hue, this.dotToSaturation(dot) * 100, this.dotToValue(dot) * 100)
          this.renderedQuad.data[i + 0] = color[0]
          this.renderedQuad.data[i + 1] = color[1]
          this.renderedQuad.data[i + 2] = color[2]
          this.renderedQuad.data[i + 3] = 255
          i += 4
        }
      }
    }
    
    this.previosHue = hue
    
    ctx.putImageData(this.renderedQuad, quadX, quadY);
    
    
    
  }
}

const toRadians = (i: number) => i * (Math.PI / 180)

function hsvToRgb(h : number, s: number, v: number) {
  var r, g, b;
  var i;
  var f, p, q, t;
  
  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));
  
  // We accept saturation and value arguments from 0 to 100 because that's
  // how Photoshop represents those values. Internally, however, the
  // saturation and value are calculated from a range of 0 to 1. We make
  // That conversion here.
  s /= 100;
  v /= 100;
  
  if(s == 0) {
    // Achromatic (grey)
    r = g = b = v;
    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  }
  
  h /= 60; // sector 0 to 5
  i = Math.floor(h);
  f = h - i; // factorial part of h
  p = v * (1 - s);
  q = v * (1 - s * f);
  t = v * (1 - s * (1 - f));
  
  switch(i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    
    default: // case 5:
      r = v;
      g = p;
      b = q;
  }
  
  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}