{
  description = "monorepo for aikyo & AITuberKit with per-shell Node versions";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.05";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, nixpkgs-unstable, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
        unstable = import nixpkgs-unstable { inherit system; };
      in {
        devShells = {
          # aikyo 用: Node 24 + pnpm
          aikyo = pkgs.mkShell {
            packages = [
              pkgs.nodejs_24
              pkgs.pnpm
            ];
            shellHook = ''
              echo "▶ aikyo shell: Node=$(node -v) / pnpm=$(pnpm -v)"
              export NODE_ENV=development
            '';
          };

          # AITuberKit 用: Node 20（npm 同梱）
          aituberkit = pkgs.mkShell {
            packages = [
              pkgs.nodejs_20
              pkgs.pnpm
              pkgs.python311
            ];
            shellHook = ''
              echo "▶ AITuberKit shell: Node=$(node -v) / npm=$(npm -v)"
              export NODE_ENV=development
            '';
          };
        };
      });
}
