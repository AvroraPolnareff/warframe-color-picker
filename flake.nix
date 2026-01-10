{
  description = "Warframe Color Picker";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    devshell.url = "github:numtide/devshell";
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [
        inputs.devshell.flakeModule
      ];
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      perSystem =
        {
          config,
          self',
          inputs',
          pkgs,
          system,
          ...
        }:
        {
          # Configures the default formatter for 'nix fmt'
          formatter = pkgs.nixfmt-rfc-style;

          devshells.default = {
            packages = [
              pkgs.nodejs_24
              pkgs.typescript-language-server
              pkgs.eslint
            ];
            commands = [
              {
                name = "dev";
                command = "npm run dev";
                help = "start the development server";
              }
            ];
          };
        };
      flake = { };
    };
}
