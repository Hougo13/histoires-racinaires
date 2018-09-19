import { html } from "hybrids";

export const SpectreLoading = target => html`
    <style>
        @keyframes loading {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    </style>
    
    ${
      target
        ? html`
            <style>
                :host(.loading) > ${target} {
                    color: transparent !important;
                    min-height: .8rem;
                    pointer-events: none;
                    position: relative;
                }

                :host(.loading) > ${target}::after {
                    animation: loading 500ms infinite linear;
                    border: .1rem solid #5755d9;
                    border-radius: 50%;
                    border-right-color: transparent;
                    border-top-color: transparent;
                    content: "";
                    display: block;
                    height: .8rem;
                    left: 50%;
                    margin-left: -.4rem;
                    margin-top: -.4rem;
                    position: absolute;
                    top: 50%;
                    width: .8rem;
                    z-index: 1;
                }

                :host(.loading.loading-lg) > ${target} {
                    min-height: 2rem;
                }

                :host(.loading.loading-lg) > ${target}::after {
                    height: 1.6rem;
                    margin-left: -.8rem;
                    margin-top: -.8rem;
                    width: 1.6rem;
                }
            </style>
        `
        : html`
            <style>
                :host(.loading) {
                    color: transparent !important;
                    min-height: .8rem;
                    pointer-events: none;
                    position: relative;
                }

                :host(.loading)::after {
                    animation: loading 500ms infinite linear;
                    border: .1rem solid #5755d9;
                    border-radius: 50%;
                    border-right-color: transparent;
                    border-top-color: transparent;
                    content: "";
                    display: block;
                    height: .8rem;
                    left: 50%;
                    margin-left: -.4rem;
                    margin-top: -.4rem;
                    position: absolute;
                    top: 50%;
                    width: .8rem;
                    z-index: 1;
                }

                :host(.loading.loading-lg) {
                    min-height: 2rem;
                }

                :host(.loading.loading-lg)::after {
                    height: 1.6rem;
                    margin-left: -.8rem;
                    margin-top: -.8rem;
                    width: 1.6rem;
                }
            </style>
        `
    }
`;
