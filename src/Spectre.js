import { html } from "hybrids";
import spectre from "spectre.css/dist/spectre.min.css";
import spectreIcons from "spectre.css/dist/spectre-icons.min.css";

export const Spectre = html`
    <style>${spectre.toString()}</style>
    <style>
        :host {
            background: #fff;
            color: #50596c;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
            font-size: 1rem;
            overflow-x: hidden;
            text-rendering: optimizeLegibility;
            box-sizing: border-box;
        }
    </style>
`;

export const SpectreIcons = html`<style>${spectreIcons.toString()}</style>`;
