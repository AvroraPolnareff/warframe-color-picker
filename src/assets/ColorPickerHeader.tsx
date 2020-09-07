import React, {FC} from "react"
import Color from "color";

export const ColorPickerHeader: FC<{ headerColor: Color, width: number }> = ({headerColor, width}) => {
  return (
      <svg width="165" height="59" viewBox="0 0 165 59" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transition: "stroke 1s linear", width: `${width}em`}}>
        <path style={{transition: "fill 1s linear"}}
          d="M8.10129 44.6257L7.66505 45.8771L8.10129 44.6257ZM3.82827 41.4368L2.73882 42.1914C2.74237 42.1966 2.74595 42.2017 2.74957 42.2067L3.82827 41.4368ZM1.97731 36.0263L3.29806 35.9166L3.29738 35.9089L1.97731 36.0263ZM4.25923 27.4547L3.17921 26.6866L3.176 26.6912L4.25923 27.4547ZM16.9521 22.4578L16.5618 23.7243L16.5695 23.7267L16.9521 22.4578ZM21.0607 25.2482L21.9465 26.2339C22.4677 25.7655 22.5342 24.9724 22.0983 24.4238L21.0607 25.2482ZM17.8359 28.1463L16.8195 28.9968C17.0503 29.2726 17.3832 29.4428 17.7419 29.4683C18.1006 29.4937 18.4543 29.3724 18.7218 29.132L17.8359 28.1463ZM7.50773 29.7094L6.42004 28.9522L6.41499 28.9595L7.50773 29.7094ZM6.09919 35.2902L7.42093 35.1932C7.42057 35.1883 7.42017 35.1833 7.41975 35.1784L6.09919 35.2902ZM8.28664 39.9229L7.47617 40.9715L8.28664 39.9229ZM18.3386 36.1653L18.7605 34.909C18.0899 34.6838 17.3606 35.025 17.1037 35.6841L18.3386 36.1653ZM22.2259 37.4708L23.4497 37.9795C23.5907 37.64 23.5845 37.2573 23.4325 36.9226C23.2804 36.5879 22.9962 36.3315 22.6478 36.2145L22.2259 37.4708ZM18.9055 42.0919L18.0292 41.0977L18.0245 41.1019L18.9055 42.0919ZM13.5337 43.4776C11.6827 43.9494 10.0314 43.895 8.53753 43.3742L7.66505 45.8771C9.7156 46.5919 11.9041 46.6283 14.1884 46.046L13.5337 43.4776ZM8.53753 43.3742C7.02051 42.8454 5.82202 41.9489 4.90696 40.6669L2.74957 42.2067C3.98744 43.941 5.63763 45.1704 7.66505 45.8771L8.53753 43.3742ZM4.91772 40.6821C4.00312 39.3618 3.4533 37.7867 3.29805 35.9166L0.656553 36.1359C0.845689 38.4141 1.52985 40.4461 2.73882 42.1914L4.91772 40.6821ZM3.29738 35.9089C3.04405 33.0587 3.72387 30.5145 5.34246 28.2183L3.176 26.6912C1.19066 29.5077 0.34918 32.6779 0.657213 36.1436L3.29738 35.9089ZM5.33924 28.2228C6.9799 25.9159 9.14085 24.4324 11.8678 23.7374L11.2131 21.1689C7.87509 22.0198 5.18188 23.8707 3.17922 26.6866L5.33924 28.2228ZM11.8678 23.7374C13.6448 23.2844 15.1962 23.3034 16.5618 23.7243L17.3425 21.1913C15.4308 20.6021 13.3744 20.618 11.2131 21.1689L11.8678 23.7374ZM16.5695 23.7267C17.9685 24.1485 19.1097 24.9231 20.023 26.0726L22.0983 24.4238C20.8502 22.8528 19.2524 21.7671 17.3347 21.1889L16.5695 23.7267ZM20.1748 24.2625L16.95 27.1606L18.7218 29.132L21.9465 26.2339L20.1748 24.2625ZM18.8523 27.2958C17.9958 26.2722 16.9519 25.5482 15.7229 25.1933C14.5028 24.841 13.1937 24.8792 11.838 25.2248L12.4927 27.7932C13.5 27.5365 14.3174 27.5463 14.9876 27.7399C15.6487 27.9308 16.2586 28.3265 16.8195 28.9968L18.8523 27.2958ZM11.838 25.2248C9.56782 25.8034 7.74226 27.0529 6.42006 28.9522L8.5954 30.4666C9.54507 29.1025 10.8246 28.2184 12.4927 27.7932L11.838 25.2248ZM6.41499 28.9595C5.11384 30.8556 4.57741 33.0246 4.77861 35.4019L7.41975 35.1784C7.26654 33.3681 7.66913 31.8165 8.60048 30.4593L6.41499 28.9595ZM4.77745 35.3871C4.94972 37.7359 5.79779 39.6742 7.47617 40.9715L9.09713 38.8743C8.1639 38.153 7.55365 37.0028 7.42093 35.1932L4.77745 35.3871ZM7.47617 40.9715C9.16894 42.2798 11.2183 42.5565 13.4378 41.9907L12.7831 39.4223C11.1825 39.8303 10.016 39.5845 9.09713 38.8743L7.47617 40.9715ZM13.4378 41.9907C16.3942 41.2372 18.4861 39.4368 19.5734 36.6466L17.1037 35.6841C16.34 37.6438 14.9465 38.8708 12.7831 39.4223L13.4378 41.9907ZM17.9167 37.4217L21.804 38.7271L22.6478 36.2145L18.7605 34.909L17.9167 37.4217ZM21.0021 36.9621C20.3399 38.5554 19.3532 39.9306 18.0292 41.0977L19.7819 43.0861C21.4031 41.657 22.63 39.9515 23.4497 37.9795L21.0021 36.9621ZM18.0245 41.1019C16.7321 42.252 15.2412 43.0423 13.5337 43.4776L14.1884 46.046C16.301 45.5075 18.1731 44.5179 19.7866 43.0819L18.0245 41.1019ZM27 37.9525L26.2029 39.0113L26.2076 39.0148L27 37.9525ZM23.2106 30.614L24.5328 30.5232C24.5323 30.5166 24.5318 30.5101 24.5313 30.5036L23.2106 30.614ZM25.5221 22.0349L26.6015 22.8038L26.6021 22.803L25.5221 22.0349ZM40.9052 18.4598L40.108 19.5186L40.1138 19.5229L40.9052 18.4598ZM44.7536 25.7833L43.4321 25.8825L43.4323 25.8854L44.7536 25.7833ZM42.4126 34.3699L43.4921 35.1388L42.4126 34.3699ZM39.0605 32.0787L37.9878 31.3003L37.9829 31.3073L39.0605 32.0787ZM40.6318 26.5194L41.9537 26.4247L41.9527 26.4119L40.6318 26.5194ZM38.3262 21.9168L37.5298 22.9762L37.5377 22.982L38.3262 21.9168ZM28.8076 24.3116L29.8953 25.0688L29.8961 25.0677L28.8076 24.3116ZM27.3325 29.8779L28.6544 29.7832L28.6542 29.7809L27.3325 29.8779ZM29.5495 34.5031L28.7412 35.5533C28.7472 35.5579 28.7532 35.5624 28.7592 35.5669L29.5495 34.5031ZM34.6193 38.1029C31.9809 38.7754 29.7502 38.3508 27.7925 36.8903L26.2076 39.0148C28.8592 40.993 31.9262 41.5247 35.274 40.6714L34.6193 38.1029ZM27.7972 36.8938C25.8255 35.4092 24.7258 33.3333 24.5328 30.5232L21.8884 30.7048C22.1286 34.2013 23.5552 37.0178 26.2029 39.0113L27.7972 36.8938ZM24.5313 30.5036C24.2907 27.6246 24.9814 25.0782 26.6015 22.8038L24.4427 21.266C22.4488 24.065 21.5985 27.238 21.8899 30.7244L24.5313 30.5036ZM26.6021 22.803C28.2339 20.5084 30.4576 18.9989 33.3374 18.2648L32.6827 15.6964C29.2219 16.5785 26.4535 18.4385 24.4421 21.2668L26.6021 22.803ZM33.3374 18.2648C35.9259 17.605 38.1391 18.0361 40.108 19.5185L41.7023 17.4011C39.0518 15.4054 36.0016 14.8504 32.6827 15.6964L33.3374 18.2648ZM40.1138 19.5229C42.1061 21.0059 43.2217 23.0794 43.4321 25.8825L46.0752 25.6841C45.813 22.1905 44.363 19.3817 41.6965 17.3967L40.1138 19.5229ZM43.4323 25.8854C43.6554 28.7723 42.9548 31.3245 41.3332 33.601L43.4921 35.1388C45.4844 32.3419 46.3446 29.1696 46.075 25.6812L43.4323 25.8854ZM41.3332 33.601C39.7178 35.8688 37.5025 37.368 34.6193 38.1029L35.274 40.6714C38.7314 39.7901 41.4935 37.9445 43.4921 35.1388L41.3332 33.601ZM34.7302 36.5634C36.9672 35.9932 38.7837 34.7421 40.1381 32.8502L37.9829 31.3073C36.9866 32.6988 35.698 33.5814 34.0755 33.9949L34.7302 36.5634ZM40.1331 32.8571C41.5143 30.9537 42.1231 28.7905 41.9537 26.4247L39.3099 26.6141C39.4354 28.3673 38.9966 29.9103 37.9878 31.3004L40.1331 32.8571ZM41.9527 26.4119C41.7616 24.0634 40.8557 22.1402 39.1146 20.8515L37.5377 22.982C38.5364 23.7212 39.1676 24.8664 39.3108 26.6269L41.9527 26.4119ZM39.1225 20.8575C37.3772 19.5454 35.3067 19.2427 33.0713 19.8125L33.726 22.3809C35.3108 21.977 36.5253 22.221 37.5298 22.9761L39.1225 20.8575ZM33.0713 19.8125C30.8445 20.3801 29.0471 21.6439 27.7192 23.5555L29.8961 25.0677C30.8694 23.6665 32.1327 22.787 33.726 22.3809L33.0713 19.8125ZM27.72 23.5544C26.4015 25.4483 25.8372 27.6084 26.0108 29.9748L28.6542 29.7809C28.5228 27.989 28.9419 26.4382 29.8953 25.0688L27.72 23.5544ZM26.0106 29.9725C26.1784 32.3154 27.0437 34.247 28.7412 35.5533L30.3578 33.4528C29.3942 32.7112 28.7816 31.5593 28.6544 29.7832L26.0106 29.9725ZM28.7592 35.5669C30.4793 36.8447 32.5241 37.1257 34.7302 36.5634L34.0755 33.9949C32.5008 34.3963 31.3101 34.1599 30.3398 33.4392L28.7592 35.5669ZM52.3368 30.3618L51.0153 30.4615C51.0447 30.8521 51.2455 31.2097 51.5636 31.4382C51.8817 31.6667 52.2846 31.7428 52.6641 31.6461L52.3368 30.3618ZM60.2232 28.3516L61.5446 28.2496C61.5145 27.8594 61.3135 27.5026 60.9955 27.2746C60.6775 27.0466 60.275 26.9707 59.8959 27.0674L60.2232 28.3516ZM60.5377 32.4237L60.865 33.7079C61.4892 33.5488 61.9086 32.9639 61.859 32.3216L60.5377 32.4237ZM48.5751 35.4729L47.2538 35.5749C47.2839 35.9651 47.4849 36.3219 47.8029 36.5499C48.1208 36.7779 48.5233 36.8538 48.9025 36.7571L48.5751 35.4729ZM48.2607 31.4008L46.9391 31.5005L46.9393 31.5029L48.2607 31.4008ZM46.938 13.8708L46.6106 12.5866C45.9872 12.7455 45.568 13.3291 45.6164 13.9705L46.938 13.8708ZM51.0141 12.8318L52.3356 12.7321C52.3061 12.3415 52.1054 11.984 51.7873 11.7555C51.4692 11.5269 51.0663 11.4508 50.6867 11.5476L51.0141 12.8318ZM52.6641 31.6461L60.5506 29.6358L59.8959 27.0674L52.0094 29.0776L52.6641 31.6461ZM58.9019 28.4536L59.2163 32.5257L61.859 32.3216L61.5446 28.2496L58.9019 28.4536ZM60.2103 31.1395L48.2478 34.1887L48.9025 36.7571L60.865 33.7079L60.2103 31.1395ZM49.8965 35.3709L49.582 31.2988L46.9393 31.5029L47.2538 35.5749L49.8965 35.3709ZM49.5822 31.3011L48.2595 13.7711L45.6164 13.9705L46.9391 31.5005L49.5822 31.3011ZM47.2653 15.155L51.3414 14.116L50.6867 11.5476L46.6106 12.5866L47.2653 15.155ZM49.6925 12.9315L51.0153 30.4615L53.6583 30.2621L52.3356 12.7321L49.6925 12.9315ZM63.7265 28.591L62.9294 29.6498L62.9341 29.6533L63.7265 28.591ZM59.9371 21.2525L61.2593 21.1617C61.2588 21.1552 61.2583 21.1486 61.2578 21.1421L59.9371 21.2525ZM62.2486 12.6734L63.328 13.4423L63.3286 13.4415L62.2486 12.6734ZM77.6317 9.09833L76.8345 10.1571L76.8403 10.1614L77.6317 9.09833ZM81.4801 16.4218L80.1586 16.521L80.1588 16.5239L81.4801 16.4218ZM79.1391 25.0084L80.2186 25.7774L79.1391 25.0084ZM75.787 22.7173L74.7143 21.9389L74.7094 21.9458L75.787 22.7173ZM77.3583 17.1579L78.6802 17.0633L78.6792 17.0504L77.3583 17.1579ZM75.0527 12.5553L74.2563 13.6147L74.2642 13.6206L75.0527 12.5553ZM65.5341 14.9501L66.6218 15.7073L66.6226 15.7062L65.5341 14.9501ZM64.059 20.5164L65.3809 20.4217L65.3807 20.4195L64.059 20.5164ZM66.276 25.1416L65.4677 26.1919C65.4737 26.1964 65.4797 26.201 65.4857 26.2055L66.276 25.1416ZM71.3458 28.7414C68.7074 29.414 66.4767 28.9893 64.519 27.5288L62.9341 29.6533C65.5857 31.6315 68.6528 32.1632 72.0005 31.3099L71.3458 28.7414ZM64.5237 27.5323C62.552 26.0477 61.4523 23.9718 61.2593 21.1617L58.6149 21.3433C58.8551 24.8399 60.2817 27.6563 62.9294 29.6498L64.5237 27.5323ZM61.2578 21.1421C61.0172 18.2632 61.7079 15.7167 63.328 13.4423L61.1692 11.9045C59.1753 14.7036 58.325 17.8765 58.6164 21.3629L61.2578 21.1421ZM63.3286 13.4415C64.9605 11.147 67.1841 9.63739 70.0639 8.90335L69.4092 6.3349C65.9484 7.21706 63.18 9.07701 61.1686 11.9053L63.3286 13.4415ZM70.0639 8.90335C72.6524 8.24355 74.8656 8.67465 76.8345 10.1571L78.4288 8.03959C75.7783 6.04395 72.7282 5.48891 69.4092 6.3349L70.0639 8.90335ZM76.8403 10.1614C78.8326 11.6445 79.9482 13.718 80.1586 16.521L82.8017 16.3226C82.5395 12.8291 81.0895 10.0202 78.423 8.03526L76.8403 10.1614ZM80.1588 16.5239C80.3819 19.4109 79.6813 21.9631 78.0597 24.2395L80.2186 25.7774C82.2109 22.9804 83.0711 19.8082 82.8015 16.3197L80.1588 16.5239ZM78.0597 24.2395C76.4443 26.5073 74.229 28.0065 71.3458 28.7414L72.0005 31.3099C75.4579 30.4286 78.22 28.583 80.2186 25.7774L78.0597 24.2395ZM71.4567 27.2019C73.6937 26.6317 75.5102 25.3806 76.8646 23.4887L74.7094 21.9458C73.7131 23.3374 72.4245 24.2199 70.802 24.6335L71.4567 27.2019ZM76.8596 23.4957C78.2409 21.5923 78.8496 19.429 78.6802 17.0633L76.0364 17.2526C76.1619 19.0058 75.7231 20.5488 74.7143 21.9389L76.8596 23.4957ZM78.6792 17.0504C78.4881 14.702 77.5823 12.7788 75.8411 11.4901L74.2642 13.6206C75.2629 14.3597 75.8941 15.5049 76.0373 17.2654L78.6792 17.0504ZM75.849 11.496C74.1037 10.1839 72.0332 9.8812 69.7978 10.451L70.4525 13.0194C72.0373 12.6155 73.2518 12.8595 74.2563 13.6147L75.849 11.496ZM69.7978 10.451C67.571 11.0186 65.7736 12.2824 64.4457 14.194L66.6226 15.7062C67.5959 14.305 68.8592 13.4256 70.4525 13.0194L69.7978 10.451ZM64.4465 14.1929C63.128 16.0868 62.5637 18.2469 62.7373 20.6134L65.3807 20.4195C65.2493 18.6275 65.6684 17.0768 66.6218 15.7073L64.4465 14.1929ZM62.7371 20.6111C62.9049 22.954 63.7703 24.8855 65.4677 26.1919L67.0843 24.0913C66.1207 23.3498 65.5081 22.1978 65.3809 20.4217L62.7371 20.6111ZM65.4857 26.2055C67.2058 27.4832 69.2506 27.7642 71.4567 27.2019L70.802 24.6335C69.2273 25.0348 68.0366 24.7985 67.0663 24.0777L65.4857 26.2055ZM99.428 8.10368L100.75 8.01632L100.75 8.00528L99.428 8.10368ZM98.6334 12.1439L97.4481 11.5511C97.4459 11.5554 97.4437 11.5598 97.4416 11.5642L98.6334 12.1439ZM95.949 15.1874L95.2172 14.0824C94.9145 14.2829 94.7073 14.5988 94.644 14.9563C94.5807 15.3138 94.6668 15.6817 94.8823 15.9739L95.949 15.1874ZM101.045 22.0985L101.372 23.3827C101.8 23.2738 102.145 22.9594 102.293 22.5441C102.441 22.1288 102.373 21.6669 102.112 21.312L101.045 22.0985ZM96.9097 23.1526L95.8384 23.9327C96.1576 24.371 96.7116 24.5707 97.2371 24.4368L96.9097 23.1526ZM92.2151 16.7053L93.2865 15.9252C92.9673 15.4868 92.4132 15.2872 91.8878 15.4211L92.2151 16.7053ZM88.8183 17.5712L88.491 16.2869C87.868 16.4457 87.4489 17.0286 87.4967 17.6697L88.8183 17.5712ZM89.3778 25.0724L89.7051 26.3567C90.328 26.1979 90.7472 25.6149 90.6994 24.9739L89.3778 25.0724ZM85.3016 26.1114L83.9801 26.2116C84.0097 26.6021 84.2105 26.9595 84.5286 27.1879C84.8467 27.4163 85.2495 27.4924 85.629 27.3957L85.3016 26.1114ZM83.6645 4.50934L83.3371 3.22511C82.7136 3.38404 82.2943 3.96788 82.3429 4.60949L83.6645 4.50934ZM96.856 3.44317L96.0717 4.51153L96.0804 4.51783L96.856 3.44317ZM95.3061 8.83977L96.6282 8.74744L96.6282 8.74744L95.3061 8.83977ZM94.2839 6.80402L93.4856 7.86188C93.4914 7.8663 93.4973 7.87067 93.5033 7.87498L94.2839 6.80402ZM88.0325 7.45381L87.7051 6.16958C87.0807 6.32873 86.6613 6.91387 86.7111 7.55627L88.0325 7.45381ZM88.5276 13.839L87.2063 13.9415C87.2365 14.3315 87.4375 14.6883 87.7555 14.9162C88.0735 15.1441 88.4759 15.2199 88.855 15.1233L88.5276 13.839ZM98.1056 8.19103C98.186 9.40848 97.9641 10.5194 97.4481 11.5511L99.8187 12.7367C100.553 11.2687 100.861 9.68619 100.75 8.01633L98.1056 8.19103ZM97.4416 11.5642C96.9426 12.5902 96.2093 13.4255 95.2172 14.0824L96.6807 16.2923C98.057 15.3809 99.1133 14.1872 99.8252 12.7235L97.4416 11.5642ZM94.8823 15.9739L99.9783 22.885L102.112 21.312L97.0156 14.4008L94.8823 15.9739ZM100.718 20.8143L96.5824 21.8683L97.2371 24.4368L101.372 23.3827L100.718 20.8143ZM97.9811 22.3724L93.2865 15.9252L91.1437 17.4854L95.8384 23.9327L97.9811 22.3724ZM91.8878 15.4211L88.491 16.2869L89.1457 18.8554L92.5424 17.9896L91.8878 15.4211ZM87.4967 17.6697L88.0561 25.171L90.6994 24.9739L90.14 17.4726L87.4967 17.6697ZM89.0504 23.7882L84.9743 24.8272L85.629 27.3957L89.7051 26.3567L89.0504 23.7882ZM86.6231 26.0113L84.9859 4.40918L82.3429 4.60949L83.9801 26.2116L86.6231 26.0113ZM83.9918 5.79356L92.0555 3.73816L91.4008 1.16971L83.3371 3.22511L83.9918 5.79356ZM92.0555 3.73816C93.5444 3.35865 94.8454 3.61125 96.0717 4.5115L97.6402 2.37484C95.7708 1.00245 93.6532 0.595564 91.4008 1.16971L92.0555 3.73816ZM96.0804 4.51783C97.3219 5.41376 97.9875 6.60526 98.1064 8.20208L100.75 8.00528C100.574 5.65068 99.5253 3.73517 97.6315 2.36851L96.0804 4.51783ZM95.7989 12.0397C96.4345 11.0438 96.7109 9.93152 96.6282 8.74744L93.9841 8.93211C94.028 9.56117 93.8881 10.1068 93.5646 10.6137L95.7989 12.0397ZM96.6282 8.74744C96.5433 7.53179 96.059 6.45791 95.0646 5.73306L93.5033 7.87498C93.7452 8.05131 93.9423 8.3346 93.9841 8.93211L96.6282 8.74744ZM95.0822 5.74616C94.0807 4.99038 92.8941 4.84694 91.6926 5.15317L92.3473 7.72163C92.9181 7.57613 93.2407 7.6771 93.4856 7.86188L95.0822 5.74616ZM91.6926 5.15317L87.7051 6.16958L88.3598 8.73803L92.3473 7.72163L91.6926 5.15317ZM86.7111 7.55627L87.2063 13.9415L89.8489 13.7366L89.3538 7.35134L86.7111 7.55627ZM88.855 15.1233L93.0492 14.0542L92.3945 11.4857L88.2003 12.5548L88.855 15.1233ZM93.0492 14.0542C94.2182 13.7562 95.1471 13.061 95.7989 12.0397L93.5646 10.6137C93.2574 11.0951 92.8797 11.3621 92.3945 11.4857L93.0492 14.0542ZM77.6966 34.0318L76.9165 35.1033L76.9242 35.1088L77.6966 34.0318ZM80.2321 38.796L78.9129 38.9224L78.9138 38.9312L80.2321 38.796ZM78.7865 44.3548L79.8582 45.1346L79.8641 45.1263L78.7865 44.3548ZM70.0748 48.5571L69.7474 47.2729C69.1231 47.4321 68.7037 48.0172 68.7535 48.6596L70.0748 48.5571ZM70.625 55.6518L70.9523 56.9361C71.5767 56.7769 71.9961 56.1918 71.9463 55.5494L70.625 55.6518ZM66.5488 56.6908L65.2273 56.791C65.2569 57.1815 65.4577 57.5389 65.7758 57.7673C66.0939 57.9957 66.4967 58.0718 66.8762 57.9751L66.5488 56.6908ZM64.9116 35.0887L64.5843 33.8045C63.9608 33.9634 63.5415 34.5473 63.5901 35.1889L64.9116 35.0887ZM76.1102 39.5321L74.7873 39.6121L74.788 39.6221L76.1102 39.5321ZM69.2796 38.0332L68.9523 36.749C68.3282 36.9081 67.9089 37.4928 67.9583 38.1349L69.2796 38.0332ZM69.7829 44.5737L68.4615 44.6753C68.4915 45.0655 68.6925 45.4225 69.0105 45.6506C69.3285 45.8787 69.731 45.9546 70.1102 45.8579L69.7829 44.5737ZM72.6528 34.4832C74.4285 34.0306 75.7968 34.288 76.9166 35.1033L78.4766 32.9604C76.6095 31.6011 74.3971 31.3033 71.9981 31.9148L72.6528 34.4832ZM76.9242 35.1088C78.0516 35.9174 78.7411 37.1288 78.9129 38.9224L81.5514 38.6697C81.3193 36.2462 80.3185 34.2815 78.469 32.9549L76.9242 35.1088ZM78.9138 38.9312C79.0934 40.6836 78.6905 42.2122 77.7089 43.5833L79.8641 45.1263C81.2332 43.2139 81.794 41.0367 81.5505 38.6609L78.9138 38.9312ZM77.7149 43.575C76.7502 44.9008 75.2886 45.8605 73.2033 46.392L73.858 48.9605C76.4199 48.3074 78.4622 47.0529 79.8581 45.1346L77.7149 43.575ZM73.2033 46.392L69.7474 47.2729L70.4021 49.8414L73.858 48.9605L73.2033 46.392ZM68.7535 48.6596L69.3036 55.7543L71.9463 55.5494L71.3961 48.4547L68.7535 48.6596ZM70.2976 54.3676L66.2215 55.4066L66.8762 57.9751L70.9523 56.9361L70.2976 54.3676ZM67.8703 56.5907L66.2331 34.9886L63.5901 35.1889L65.2273 56.791L67.8703 56.5907ZM65.239 36.373L72.6528 34.4832L71.9981 31.9148L64.5843 33.8045L65.239 36.373ZM77.4331 39.4521C77.3588 38.2231 76.922 37.0927 75.9166 36.3541L74.3475 38.4903C74.529 38.6236 74.7443 38.8998 74.7874 39.6121L77.4331 39.4521ZM75.9166 36.3541C74.8773 35.5907 73.5938 35.5659 72.3491 35.8832L73.0038 38.4516C73.8463 38.2368 74.2 38.3819 74.3475 38.4903L75.9166 36.3541ZM72.3491 35.8832L68.9523 36.749L69.607 39.3174L73.0038 38.4516L72.3491 35.8832ZM67.9583 38.1349L68.4615 44.6753L71.1043 44.472L70.601 37.9315L67.9583 38.1349ZM70.1102 45.8579L73.3003 45.0448L72.6456 42.4763L69.4556 43.2894L70.1102 45.8579ZM73.3003 45.0448C74.6278 44.7064 75.7355 44.0321 76.4897 42.9588L74.3211 41.4348C73.9981 41.8944 73.4841 42.2626 72.6456 42.4763L73.3003 45.0448ZM76.4897 42.9588C77.2174 41.9234 77.52 40.7289 77.4325 39.4421L74.788 39.6221C74.8379 40.3555 74.6707 40.9374 74.3211 41.4348L76.4897 42.9588ZM82.4817 30.6102L82.1543 29.326C81.5308 29.4849 81.1115 30.0687 81.1602 30.7104L82.4817 30.6102ZM86.5578 29.5712L87.8793 29.4711C87.8497 29.0806 87.6489 28.7232 87.3308 28.4947C87.0127 28.2663 86.6099 28.1903 86.2304 28.287L86.5578 29.5712ZM88.195 51.1733L88.5223 52.4575C89.1458 52.2986 89.5651 51.7148 89.5165 51.0731L88.195 51.1733ZM84.1188 52.2123L82.7973 52.3124C82.8269 52.7029 83.0277 53.0603 83.3458 53.2888C83.6639 53.5172 84.0667 53.5932 84.4462 53.4965L84.1188 52.2123ZM82.809 31.8944L86.8851 30.8554L86.2304 28.287L82.1543 29.326L82.809 31.8944ZM85.2363 29.6714L86.8735 51.2735L89.5165 51.0731L87.8793 29.4711L85.2363 29.6714ZM87.8676 49.8891L83.7915 50.9281L84.4462 53.4965L88.5223 52.4575L87.8676 49.8891ZM85.4403 52.1121L83.8032 30.51L81.1602 30.7104L82.7973 52.3124L85.4403 52.1121ZM96.4993 47.8927L96.063 49.1441L96.4993 47.8927ZM92.2262 44.7038L91.1368 45.4585C91.1403 45.4636 91.1439 45.4687 91.1475 45.4737L92.2262 44.7038ZM90.3753 39.2933L91.696 39.1836L91.6953 39.176L90.3753 39.2933ZM92.6572 30.7217L91.5772 29.9536L91.574 29.9582L92.6572 30.7217ZM105.35 25.7248L104.96 26.9913L104.967 26.9937L105.35 25.7248ZM109.459 28.5152L110.344 29.5009C110.866 29.0326 110.932 28.2394 110.496 27.6908L109.459 28.5152ZM106.234 31.4133L105.217 32.2638C105.448 32.5396 105.781 32.7098 106.14 32.7353C106.499 32.7608 106.852 32.6394 107.12 32.399L106.234 31.4133ZM95.9057 32.9764L94.818 32.2192L94.8129 32.2266L95.9057 32.9764ZM94.4971 38.5572L95.8189 38.4602C95.8185 38.4553 95.8181 38.4504 95.8177 38.4454L94.4971 38.5572ZM96.6846 43.1899L95.8741 44.2385L96.6846 43.1899ZM106.737 39.4324L107.158 38.176C106.488 37.9508 105.759 38.292 105.502 38.9511L106.737 39.4324ZM110.624 40.7378L111.848 41.2465C111.989 40.907 111.982 40.5243 111.83 40.1896C111.678 39.855 111.394 39.5985 111.046 39.4815L110.624 40.7378ZM107.303 45.3589L106.427 44.3647L106.422 44.3689L107.303 45.3589ZM101.932 46.7446C100.081 47.2164 98.4294 47.162 96.9355 46.6412L96.063 49.1441C98.1136 49.8589 100.302 49.8953 102.586 49.313L101.932 46.7446ZM96.9355 46.6412C95.4185 46.1124 94.22 45.2159 93.3049 43.9339L91.1475 45.4737C92.3854 47.208 94.0356 48.4374 96.063 49.1441L96.9355 46.6412ZM93.3157 43.9492C92.4011 42.6288 91.8513 41.0538 91.696 39.1836L89.0545 39.4029C89.2436 41.6811 89.9278 43.7131 91.1368 45.4585L93.3157 43.9492ZM91.6953 39.176C91.442 36.3257 92.1218 33.7815 93.7404 31.4853L91.574 29.9582C89.5886 32.7747 88.7471 35.9449 89.0552 39.4106L91.6953 39.176ZM93.7372 31.4898C95.3779 29.1829 97.5388 27.6995 100.266 27.0044L99.6111 24.4359C96.273 25.2868 93.5798 27.1377 91.5772 29.9536L93.7372 31.4898ZM100.266 27.0044C102.043 26.5514 103.594 26.5704 104.96 26.9913L105.74 24.4583C103.829 23.8691 101.772 23.885 99.6111 24.4359L100.266 27.0044ZM104.967 26.9937C106.366 27.4155 107.508 28.1901 108.421 29.3396L110.496 27.6908C109.248 26.1198 107.65 25.0342 105.733 24.4559L104.967 26.9937ZM108.573 27.5295L105.348 30.4276L107.12 32.399L110.344 29.5009L108.573 27.5295ZM107.25 30.5628C106.394 29.5392 105.35 28.8152 104.121 28.4603C102.901 28.1081 101.592 28.1462 100.236 28.4918L100.891 31.0602C101.898 30.8035 102.715 30.8134 103.386 31.0069C104.047 31.1978 104.657 31.5935 105.217 32.2638L107.25 30.5628ZM100.236 28.4918C97.9658 29.0704 96.1402 30.32 94.818 32.2192L96.9934 33.7336C97.943 32.3695 99.2225 31.4854 100.891 31.0602L100.236 28.4918ZM94.8129 32.2266C93.5118 34.1227 92.9754 36.2916 93.1766 38.669L95.8177 38.4454C95.6645 36.6351 96.0671 35.0835 96.9984 33.7263L94.8129 32.2266ZM93.1754 38.6541C93.3477 41.0029 94.1957 42.9412 95.8741 44.2385L97.4951 42.1413C96.5619 41.42 95.9516 40.2699 95.8189 38.4602L93.1754 38.6541ZM95.8741 44.2385C97.5669 45.5469 99.6162 45.8235 101.836 45.2578L101.181 42.6893C99.5805 43.0973 98.4139 42.8515 97.4951 42.1413L95.8741 44.2385ZM101.836 45.2578C104.792 44.5042 106.884 42.7038 107.971 39.9136L105.502 38.9511C104.738 40.9108 103.345 42.1379 101.181 42.6893L101.836 45.2578ZM106.315 40.6887L110.202 41.9941L111.046 39.4815L107.158 38.176L106.315 40.6887ZM109.4 40.2291C108.738 41.8224 107.751 43.1976 106.427 44.3647L108.18 46.3531C109.801 44.924 111.028 43.2185 111.848 41.2465L109.4 40.2291ZM106.422 44.3689C105.13 45.5191 103.639 46.3094 101.932 46.7446L102.586 49.313C104.699 48.7745 106.571 47.7849 108.185 46.3489L106.422 44.3689ZM128.066 18.9909L129.212 19.6558C129.48 19.1943 129.445 18.6172 129.123 18.1916C128.801 17.766 128.256 17.5749 127.738 17.7067L128.066 18.9909ZM120.702 31.689L119.555 31.0241C119.252 31.5479 119.341 32.211 119.774 32.635L120.702 31.689ZM129.762 40.578L130.089 41.8622C130.553 41.744 130.917 41.3849 131.042 40.9227C131.166 40.4605 131.032 39.9671 130.69 39.632L129.762 40.578ZM125.479 41.6697L124.551 42.6155C124.882 42.94 125.358 43.0683 125.807 42.9539L125.479 41.6697ZM116.879 33.2295L117.808 32.2837C117.413 31.8968 116.821 31.795 116.32 32.0281C115.819 32.2612 115.516 32.7805 115.558 33.3312L116.879 33.2295ZM117.681 43.6573L118.009 44.9415C118.633 44.7825 119.052 44.1978 119.003 43.5557L117.681 43.6573ZM113.605 44.6963L112.284 44.7965C112.313 45.1869 112.514 45.5443 112.832 45.7728C113.15 46.0012 113.553 46.0772 113.933 45.9805L113.605 44.6963ZM111.968 23.0942L111.641 21.81C111.017 21.9689 110.598 22.5528 110.647 23.1944L111.968 23.0942ZM116.044 22.0552L117.366 21.9563C117.337 21.5656 117.136 21.2078 116.818 20.9791C116.5 20.7504 116.097 20.6742 115.717 20.771L116.044 22.0552ZM116.737 31.3154L115.416 31.4143C115.459 31.9933 115.874 32.4766 116.44 32.6069C117.006 32.7372 117.59 32.4841 117.883 31.9824L116.737 31.3154ZM123.192 20.2332L122.865 18.949C122.521 19.0368 122.226 19.2591 122.047 19.5662L123.192 20.2332ZM126.919 18.3261L119.555 31.0241L121.848 32.3539L129.212 19.6558L126.919 18.3261ZM119.774 32.635L128.834 41.524L130.69 39.632L121.63 30.743L119.774 32.635ZM129.435 39.2937L125.152 40.3854L125.807 42.9539L130.089 41.8622L129.435 39.2937ZM126.407 40.7238L117.808 32.2837L115.951 34.1754L124.551 42.6155L126.407 40.7238ZM115.558 33.3312L116.36 43.7589L119.003 43.5557L118.201 33.1279L115.558 33.3312ZM117.354 42.3731L113.278 43.4121L113.933 45.9805L118.009 44.9415L117.354 42.3731ZM114.927 44.5961L113.29 22.9941L110.647 23.1944L112.284 44.7965L114.927 44.5961ZM112.295 24.3784L116.372 23.3394L115.717 20.771L111.641 21.81L112.295 24.3784ZM114.723 22.1541L115.416 31.4143L118.059 31.2165L117.366 21.9563L114.723 22.1541ZM117.883 31.9824L124.337 20.9002L122.047 19.5662L115.592 30.6484L117.883 31.9824ZM123.52 21.5174L128.393 20.2752L127.738 17.7067L122.865 18.949L123.52 21.5174ZM143.216 19.2815L143.543 20.5658C144.167 20.4067 144.587 19.8218 144.537 19.1795L143.216 19.2815ZM134.65 21.4649L134.322 20.1807C133.701 20.3391 133.282 20.9199 133.328 21.5596L134.65 21.4649ZM134.982 26.0988L133.66 26.1935C133.688 26.585 133.888 26.944 134.206 27.1737C134.525 27.4033 134.929 27.48 135.309 27.383L134.982 26.0988ZM142.839 24.0961L144.161 24.0092C144.135 23.6161 143.936 23.2549 143.617 23.0235C143.298 22.7921 142.893 22.7146 142.511 22.8119L142.839 24.0961ZM143.101 28.0871L143.428 29.3713C144.047 29.2136 144.465 28.6372 144.423 28.0002L143.101 28.0871ZM135.303 30.0747L134.976 28.7905C134.353 28.9491 133.934 29.5311 133.981 30.1715L135.303 30.0747ZM135.658 34.9229L134.336 35.0197C134.365 35.4108 134.565 35.7692 134.884 35.9984C135.202 36.2275 135.605 36.304 135.985 36.2071L135.658 34.9229ZM144.372 32.7018L145.693 32.5998C145.663 32.2097 145.462 31.8528 145.144 31.6248C144.826 31.3968 144.423 31.321 144.044 31.4176L144.372 32.7018ZM144.686 36.7739L145.013 38.0581C145.638 37.899 146.057 37.3141 146.007 36.6719L144.686 36.7739ZM131.896 40.0339L130.575 40.1341C130.604 40.5246 130.805 40.882 131.123 41.1104C131.441 41.3388 131.844 41.4149 132.224 41.3182L131.896 40.0339ZM130.259 18.4319L129.932 17.1476C129.308 17.3066 128.889 17.8904 128.938 18.532L130.259 18.4319ZM142.901 15.2095L144.222 15.1074C144.192 14.7173 143.991 14.3605 143.673 14.1324C143.355 13.9044 142.953 13.8286 142.574 13.9252L142.901 15.2095ZM142.888 17.9973L134.322 20.1807L134.977 22.7492L143.543 20.5658L142.888 17.9973ZM133.328 21.5596L133.66 26.1935L136.304 26.0041L135.972 21.3703L133.328 21.5596ZM135.309 27.383L143.166 25.3803L142.511 22.8119L134.654 24.8146L135.309 27.383ZM141.516 24.183L141.778 28.174L144.423 28.0002L144.161 24.0092L141.516 24.183ZM142.774 26.8029L134.976 28.7905L135.63 31.359L143.428 29.3713L142.774 26.8029ZM133.981 30.1715L134.336 35.0197L136.98 34.8261L136.625 29.9779L133.981 30.1715ZM135.985 36.2071L144.699 33.9861L144.044 31.4176L135.331 33.6387L135.985 36.2071ZM143.05 32.8039L143.365 36.876L146.007 36.6719L145.693 32.5998L143.05 32.8039ZM144.359 35.4897L131.569 38.7497L132.224 41.3182L145.013 38.0581L144.359 35.4897ZM133.218 39.9338L131.581 18.3317L128.938 18.532L130.575 40.1341L133.218 39.9338ZM130.587 19.7161L143.228 16.4937L142.574 13.9252L129.932 17.1476L130.587 19.7161ZM141.58 15.3115L141.894 19.3836L144.537 19.1795L144.222 15.1074L141.58 15.3115ZM161.833 17.9962L163.156 17.9088L163.155 17.8978L161.833 17.9962ZM161.039 22.0364L159.853 21.4435C159.851 21.4479 159.849 21.4523 159.847 21.4567L161.039 22.0364ZM158.354 25.0799L157.622 23.9749C157.32 24.1753 157.112 24.4912 157.049 24.8488C156.986 25.2063 157.072 25.5741 157.288 25.8664L158.354 25.0799ZM163.45 31.991L163.778 33.2752C164.205 33.1663 164.55 32.8519 164.698 32.4366C164.847 32.0213 164.779 31.5594 164.517 31.2045L163.45 31.991ZM159.315 33.045L158.244 33.8252C158.563 34.2635 159.117 34.4632 159.642 34.3293L159.315 33.045ZM154.62 26.5978L155.692 25.8177C155.372 25.3793 154.818 25.1797 154.293 25.3136L154.62 26.5978ZM151.224 27.4636L150.896 26.1794C150.273 26.3382 149.854 26.9211 149.902 27.5622L151.224 27.4636ZM151.783 34.9649L152.11 36.2491C152.733 36.0904 153.152 35.5074 153.105 34.8664L151.783 34.9649ZM147.707 36.0039L146.385 36.1041C146.415 36.4946 146.616 36.852 146.934 37.0804C147.252 37.3088 147.655 37.3849 148.034 37.2881L147.707 36.0039ZM146.07 14.4018L145.742 13.1176C145.119 13.2765 144.7 13.8604 144.748 14.502L146.07 14.4018ZM159.261 13.3357L158.477 14.404L158.486 14.4103L159.261 13.3357ZM157.711 18.7323L159.033 18.6399L157.711 18.7323ZM156.689 16.6965L155.891 17.7544C155.897 17.7588 155.903 17.7632 155.908 17.7675L156.689 16.6965ZM150.438 17.3463L150.11 16.0621C149.486 16.2212 149.067 16.8064 149.116 17.4488L150.438 17.3463ZM150.933 23.7315L149.612 23.834C149.642 24.224 149.843 24.5808 150.161 24.8087C150.479 25.0366 150.881 25.1124 151.26 25.0158L150.933 23.7315ZM160.511 18.0835C160.591 19.301 160.369 20.4119 159.853 21.4435L162.224 22.6292C162.958 21.1612 163.266 19.5787 163.156 17.9088L160.511 18.0835ZM159.847 21.4567C159.348 22.4827 158.614 23.318 157.622 23.9749L159.086 26.1848C160.462 25.2734 161.519 24.0797 162.23 22.616L159.847 21.4567ZM157.288 25.8664L162.383 32.7775L164.517 31.2045L159.421 24.2933L157.288 25.8664ZM163.123 30.7068L158.988 31.7608L159.642 34.3293L163.778 33.2752L163.123 30.7068ZM160.386 32.2649L155.692 25.8177L153.549 27.3779L158.244 33.8252L160.386 32.2649ZM154.293 25.3136L150.896 26.1794L151.551 28.7479L154.948 27.882L154.293 25.3136ZM149.902 27.5622L150.461 35.0635L153.105 34.8664L152.545 27.3651L149.902 27.5622ZM151.456 33.6807L147.379 34.7197L148.034 37.2881L152.11 36.2491L151.456 33.6807ZM149.028 35.9038L147.391 14.3017L144.748 14.502L146.385 36.1041L149.028 35.9038ZM146.397 15.6861L154.461 13.6306L153.806 11.0622L145.742 13.1176L146.397 15.6861ZM154.461 13.6306C155.95 13.2511 157.251 13.5037 158.477 14.404L160.045 12.2673C158.176 10.8949 156.058 10.488 153.806 11.0622L154.461 13.6306ZM158.486 14.4103C159.727 15.3062 160.393 16.4978 160.512 18.0946L163.155 17.8978C162.98 15.5432 161.93 13.6277 160.037 12.261L158.486 14.4103ZM158.204 21.9322C158.84 20.9363 159.116 19.824 159.033 18.6399L156.389 18.8246C156.433 19.4537 156.293 19.9993 155.97 20.5062L158.204 21.9322ZM159.033 18.6399C158.949 17.4243 158.464 16.3504 157.47 15.6255L155.908 17.7675C156.15 17.9438 156.348 18.2271 156.389 18.8246L159.033 18.6399ZM157.487 15.6386C156.486 14.8829 155.299 14.7394 154.098 15.0457L154.753 17.6141C155.323 17.4686 155.646 17.5696 155.891 17.7544L157.487 15.6386ZM154.098 15.0457L150.11 16.0621L150.765 18.6305L154.753 17.6141L154.098 15.0457ZM149.116 17.4488L149.612 23.834L152.254 23.6291L151.759 17.2438L149.116 17.4488ZM151.26 25.0158L155.454 23.9467L154.8 21.3782L150.605 22.4473L151.26 25.0158ZM155.454 23.9467C156.623 23.6487 157.552 22.9535 158.204 21.9322L155.97 20.5062C155.663 20.9876 155.285 21.2545 154.8 21.3782L155.454 23.9467Z"
          fill={headerColor.lightness(78).saturationl(59).hex()}/>
      </svg>
  )
}

