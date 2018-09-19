import { html, dispatch } from "hybrids";
import { SpectreLoading } from "./mixins";

const clickHandler = (host, event) => {
  if (host.type == "submit") {
    dispatch(host, "submit", { bubbles: true, cancelable: true });
  }
};

export default {
  type: "submit",
  render: () => html`
        ${SpectreLoading("button")}
        <style>
            :host {
                width: fit-content;
            }
            button {
                box-sizing: border-box;
                appearance: none;
                background: #fff;
                border: .05rem solid #5755d9;
                border-radius: .1rem;
                color: #5755d9;
                cursor: pointer;
                display: inline-block;
                font-size: .8rem;
                height: 1.8rem;
                line-height: 1.2rem;
                outline: none;
                padding: .25rem .4rem;
                text-align: center;
                text-decoration: none;
                transition: all .2s ease;
                user-select: none;
                vertical-align: middle;
                white-space: nowrap;
            }

            :host(:focus) > button {
                box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);
            }

            :host(:focus) > button,
            :host(:hover) > button{
                background: #f1f1fc;
                border-color: #4b48d6;
                text-decoration: none;
            }

            :host(:active) > button,
            :host(.active) > button {
                background: #4b48d6;
                border-color: #3634d2;
                color: #fff;
                text-decoration: none;
            }

            :host(:active.loading) > button::after,
            :host(.active.loading) > button::after {
                border-bottom-color: #fff;
                border-left-color: #fff;
            }

            :host(:active.loading) > button::after,
            :host(.active.loading) > button::after {
                border-bottom-color: #fff;
                border-left-color: #fff;
            }

            :host([disabled]) > button,
            :host(:disabled) > button,
            :host(.disabled) > button {
                cursor: default;
                opacity: .5;
                pointer-events: none;
            }


            :host(.primary) > button {
                background: #5755d9;
                border-color: #4b48d6;
                color: #fff;
            }

            :host(.primary:focus) > button,
            :host(.primary:hover)  > button {
                background: #4240d4;
                border-color: #3634d2;
                color: #fff;
            }

            :host(.primary:active) > button,
            :host(.primary.active) > button {
                background: #3a38d2;
                border-color: #302ecd;
                color: #fff;
            }

            :host(.primary.loading) > button::after {
                border-bottom-color: #fff;
                border-left-color: #fff;
            }

            :host(.success) > button {
            background: #32b643;
            border-color: #2faa3f;
            color: #fff;
            }

            :host(.success:focus) > button {
                box-shadow: 0 0 0 .1rem rgba(50, 182, 67, .2);
            }

            :host(.success:focus) > button,
            :host(.success:hover) > button {
                background: #30ae40;
                border-color: #2da23c;
                color: #fff;
            }

            :host(.success:active) > button,
            :host(.success.active) > button {
                background: #2a9a39;
                border-color: #278e34;
                color: #fff;
            }

            :host(.success.loading) > button::after {
                border-bottom-color: #fff;
                border-left-color: #fff;
            }

            :host(.error) > button {
                background: #e85600;
                border-color: #d95000;
                color: #fff;
            }

            :host(.error:focus) > button {
                box-shadow: 0 0 0 .1rem rgba(232, 86, 0, .2);
            }

            :host(.error:focus) > button,
            :host(.error:hover) > button {
                background: #de5200;
                border-color: #cf4d00;
                color: #fff;
            }

            :host(.error:active) > button,
            :host(.error.active) > button {
                background: #c44900;
                border-color: #b54300;
                color: #fff;
            }

            :host(.error.loading) > button::after {
                border-bottom-color: #fff;
                border-left-color: #fff;
            }

            :host(.link) > button {
                background: transparent;
                border-color: transparent;
                color: #5755d9;
            }

            :host(.link:focus) > button,
            :host(.link:hover) > button,
            :host(.link:active) > button,
            :host(.link.active) > button {
                color: #302ecd;
            }

            :host(.sm) > button {
                font-size: .7rem;
                height: 1.4rem;
                padding: .05rem .3rem;
            }

            :host(.lg) > button {
                font-size: .9rem;
                height: 2rem;
                padding: .35rem .6rem;
            }

            :host(.block) > button {
                display: block;
                width: 100%;
            }

            :host(.action) > button {
                padding-left: 0;
                padding-right: 0; 
                width: 1.8rem;
            }

            :host(.action.sm) > button {
                width: 1.4rem;
            }

            :host(.action.lg) > button {
                width: 2rem;
            }

            :host(.clear) > button {
                background: transparent;
                border: 0;
                color: currentColor;
                height: .8rem;
                line-height: .8rem;
                margin-left: .2rem;
                margin-right: -2px;
                opacity: 1;
                padding: 0;
                text-decoration: none;
                width: .8rem;
            }
            
            :host(.clear:hover) > button {
                opacity: .95;
            }

            :host(.clear) > button::before {
                content: ${'"\\2715"'};
            }
        </style>
        <button type="submit">
            <slot></slot>
        </button>
    `
};

// export default {
//     render: () => html`
//           ${SpectreLoading}
//           <style>
//               :host {
//                   box-sizing: border-box;
//                   appearance: none;
//                   background: #fff;
//                   border: .05rem solid #5755d9;
//                   border-radius: .1rem;
//                   color: #5755d9;
//                   cursor: pointer;
//                   display: inline-block;
//                   font-size: .8rem;
//                   height: 1.8rem;
//                   line-height: 1.2rem;
//                   outline: none;
//                   padding: .25rem .4rem;
//                   text-align: center;
//                   text-decoration: none;
//                   transition: all .2s ease;
//                   user-select: none;
//                   vertical-align: middle;
//                   white-space: nowrap;
//               }

//               :host(:focus) {
//                   box-shadow: 0 0 0 .1rem rgba(87, 85, 217, .2);
//               }

//               :host(:focus),
//               :host(:hover) {
//                   background: #f1f1fc;
//                   border-color: #4b48d6;
//                   text-decoration: none;
//               }

//               :host(:active),
//               :host(.active) {
//                   background: #4b48d6;
//                   border-color: #3634d2;
//                   color: #fff;
//                   text-decoration: none;
//               }

//               :host(:active.loading)::after,
//               :host(.active.loading)::after {
//                   border-bottom-color: #fff;
//                   border-left-color: #fff;
//               }

//               :host(:active.loading)::after,
//               :host(.active.loading)::after {
//                   border-bottom-color: #fff;
//                   border-left-color: #fff;
//               }

//               :host([disabled]),
//               :host(:disabled),
//               :host(.disabled) {
//                   cursor: default;
//                   opacity: .5;
//                   pointer-events: none;
//               }

//               :host(.primary) {
//                   background: #5755d9;
//                   border-color: #4b48d6;
//                   color: #fff;
//               }

//               :host(.primary:focus),
//               :host(.primary:hover) {
//                   background: #4240d4;
//                   border-color: #3634d2;
//                   color: #fff;
//               }

//               :host(.primary:active),
//               :host(.primary.active) {
//                   background: #3a38d2;
//                   border-color: #302ecd;
//                   color: #fff;
//               }

//               :host(.primary.loading)::after {
//                   border-bottom-color: #fff;
//                   border-left-color: #fff;
//               }

//               :host(.success) {
//               background: #32b643;
//               border-color: #2faa3f;
//               color: #fff;
//               }

//               :host(.success:focus) {
//                   box-shadow: 0 0 0 .1rem rgba(50, 182, 67, .2);
//               }

//               :host(.success:focus),
//               :host(.success:hover) {
//                   background: #30ae40;
//                   border-color: #2da23c;
//                   color: #fff;
//               }

//               :host(.success:active),
//               :host(.success.active) {
//                   background: #2a9a39;
//                   border-color: #278e34;
//                   color: #fff;
//               }

//               :host(.success.loading)::after {
//                   border-bottom-color: #fff;
//                   border-left-color: #fff;
//               }

//               :host(.error) {
//                   background: #e85600;
//                   border-color: #d95000;
//                   color: #fff;
//               }

//               :host(.error:focus) {
//                   box-shadow: 0 0 0 .1rem rgba(232, 86, 0, .2);
//               }

//               :host(.error:focus),
//               :host(.error:hover) {
//                   background: #de5200;
//                   border-color: #cf4d00;
//                   color: #fff;
//               }

//               :host(.error:active),
//               :host(.error.active) {
//                   background: #c44900;
//                   border-color: #b54300;
//                   color: #fff;
//               }

//               :host(.error.loading)::after {
//                   border-bottom-color: #fff;
//                   border-left-color: #fff;
//               }

//               :host(.link) {
//                   background: transparent;
//                   border-color: transparent;
//                   color: #5755d9;
//               }

//               :host(.link:focus),
//               :host(.link:hover),
//               :host(.link:active),
//               :host(.link.active) {
//                   color: #302ecd;
//               }

//               :host(.sm) {
//                   font-size: .7rem;
//                   height: 1.4rem;
//                   padding: .05rem .3rem;
//               }

//               :host(.lg) {
//                   font-size: .9rem;
//                   height: 2rem;
//                   padding: .35rem .6rem;
//               }

//               :host(.block) {
//                   display: block;
//                   width: 100%;
//               }

//               :host(.action) {
//                   padding-left: 0;
//                   padding-right: 0;
//                   width: 1.8rem;
//               }

//               :host(.action.sm) {
//                   width: 1.4rem;
//               }

//               :host(.action.lg) {
//                   width: 2rem;
//               }

//               :host(.clear) {
//                   background: transparent;
//                   border: 0;
//                   color: currentColor;
//                   height: .8rem;
//                   line-height: .8rem;
//                   margin-left: .2rem;
//                   margin-right: -2px;
//                   opacity: 1;
//                   padding: 0;
//                   text-decoration: none;
//                   width: .8rem;
//               }

//               :host(.clear:hover) {
//                   opacity: .95;
//               }

//               :host(.clear)::before {
//                   content: ${'"\\2715"'};
//               }
//           </style>
//           <slot></slot>
//       `
//   };
