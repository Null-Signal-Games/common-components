const css = String.raw;

const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)");

class SparklyText extends HTMLElement {
	static tagName = "sparkly-text";
	#disabled;
	// allowPausing is NOT reactive.
	#allowPausing;

	static get observedAttributes() {
		return ["sparkle-amount", "sparkle-rate", "sparkle-variance", "disabled", "allow-pausing"];
	}

	get numberOfSparkles() {
		// Default number of sparkles is 8
		const strVal = this.getAttribute("sparkle-amount") ?? String(8);
		return parseInt(strVal);
	}
	set numberOfSparkles(value) {
		const newvalue = Number(value);
		this.setAttribute("sparkle-amount", newvalue.toString());
	}
	get sparkleRate() {
		// default rate is an average of 1 sparkle every 250ms
		const strVal = this.getAttribute("sparkle-rate") ?? String(250);
		return parseInt(strVal);
	}
	set sparkleRate(value) {
		const newvalue = Number(value);
		this.setAttribute("sparkle-rate", newvalue.toString());
	}
	get sparkleVariance() {
		// default variance of +-200ms
		const strVal = this.getAttribute("sparkle-variance") ?? String(200);
		return parseInt(strVal);
	}
	set sparkleVariance(value) {
		const newvalue = Number(value);
		this.setAttribute("sparkle-variance", newvalue.toString());
	}
	get disabled() {
		return this.#disabled;
	}
	set disabled(value) {
		this.#disabled = value;
		const currentAttr = this.getAttribute("disabled") !== null;
		// Don't trigger if already equal
		if (currentAttr !== this.#disabled) {
			if (this.#disabled) {
				this.setAttribute("disabled", "");
			} else {
				this.removeAttribute("disabled");
			}
		}
	}

	static style = css`
    :host {
      --_sparkle-base-size: var(--sparkly-text-size, 15px);
      --_sparkle-base-animation-length: var(--sparkly-text-animation-length, 900ms);
      --_sparkle-base-color: var(--sparkly-text-color, #FFC700);
      --_sparkle-base-text-shadow-color: var(--sparkly-text-shadow-color, none)

      display: inline-block;
      isolation: isolate;
      text-shadow: var(--_sparkle-base-text-shadow-color, none);
      text-shadow: 0 0 3px white,0px 0px 1px white;
      position: relative;
      z-index: 0;
    }

    button {
      all: unset;
      display: inline-block;
      cursor: pointer;
      color: inherit;
    }

    svg {
      display: block;
      transform-origin: center;
      width: inherit;
      height: inherit;
    }

    svg path {
      fill: var(--_sparkle-base-color);
    }

    @media (prefers-reduced-motion: no-preference) {
      span[data-animation-active="true"] {
        animation: comeInOut 900ms forwards;
      }
      span[data-animation-active="true"] svg {
        animation: spin 1000ms linear;
      }
      span[data-animation-active="false"] {
        opacity: 0;
      }
    }

    span {
      position: absolute;
      display: block;
      pointer-events: none;
      transform-origin: center;
      z-index: -1;
      width: var(--_sparkle-base-size);
      height: var(--_sparkle-base-size);
    }

    @keyframes comeInOut {
      0% {
        transform: translate3d(-50%, -50%, 0) scale(0);
      }
      50% {
        transform: translate3d(-50%, -50%, 0) scale(1);
      }
      100% {
        transform: translate3d(-50%, -50%, 0) scale(0);
      }
    }
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(100deg);
      }
    }`;

	constructor() {
		super();
		this.#disabled = false;
		this.#allowPausing = true;
		let shadowroot = this.attachShadow({ mode: "open" });

		let sheet = new CSSStyleSheet();
		sheet.replaceSync(SparklyText.style);
		shadowroot.adoptedStyleSheets = [sheet];

		// add slot
		shadowroot.append(document.createElement("slot"));
	}

	connectedCallback() {
		this.#disabled = this.getAttribute("disabled") !== null;
		this.#allowPausing = Boolean(this.getAttribute("allow-pausing") ?? true);

		// if we're allowing pausing, then move the slot into the button
		if (this.#allowPausing) {
			let buttonWrapper = document.createElement("button");
			this.shadowRoot!.append(buttonWrapper);
			// never null since we created it in the constructor
			buttonWrapper.appendChild(this.shadowRoot!.firstElementChild!);
			buttonWrapper.addEventListener("click", this.pauseSparkles);
		}

		motionOK.addEventListener("change", this.motionOkChange);
		// steps: create sparkles. add them to shadow root. begin animating
		if (!motionOK.matches) {
			this.generateSparkles(Math.floor(this.numberOfSparkles / 2));
			this.shadowRoot!.querySelectorAll("span[data-animation-active]").forEach((sparkle) => this.#styleSparkle(sparkle as HTMLElement));
		} else {
			this.generateSparkles(this.numberOfSparkles);
			this.sparkleSparkles();
		}
	}

	motionOkChange = () => { this.disabled = motionOK.matches };

	disconnectedCallback() {
		if (this.#allowPausing) {
			this.querySelector('button')?.removeEventListener("change", this.pauseSparkles)
		}
		motionOK.removeEventListener("change", this.motionOkChange);
		this.cleanupSparkles();
	}

	pauseSparkles = () => { this.disabled = !this.disabled; }

	cleanupSparkles() {
		const sparkles = this.shadowRoot?.querySelectorAll("span > svg");
		sparkles?.forEach((sparkle) => sparkle.remove());
	}

	generateSparkles(count: number) {
		const template = document.createElement('template');
		template.innerHTML = `
			<span data-animation-active="false">
				<svg width="10" height="10" viewbox="0 0 184 184" fill="none" aria-hidden="true">
      		<path fill="#FFC700" d="M92 0C92 0 96 63.4731 108.263 75.7365C120.527 88 184 92 184 92C184 92 118.527 98 108.263 108.263C98 118.527 92 184 92 184C92 184 86.4731 119 75.7365 108.263C65 97.5269 0 92 0 92C0 92 63.9731 87.5 75.7365 75.7365C87.5 63.9731 92 0 92 0Z"/>
        </svg>
      </span>`;

		let attachNode = this.#allowPausing ? this.shadowRoot?.firstElementChild : this.shadowRoot;

		[...Array(count).keys()].forEach(() => {
			const sparkleTemplate = (template.content.cloneNode(true) as DocumentFragment).children[0] as HTMLElement;
			// using children is strictly correct. template.content is a document fragment that no longer exists to put an event listener on.
			// see: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template#avoiding_documentfragment_pitfalls
			sparkleTemplate.addEventListener("animationend", (e: AnimationEvent) => { (e.target as HTMLElement).dataset.animationActive = "false"; })
			attachNode!.appendChild(sparkleTemplate);
		})
	}

	sparkleSparkles() {
		setRandomInterval(() => {
			if (this.disabled) {
				return;
			}
			let availableSparkle = this.shadowRoot!.querySelector('span[data-animation-active="false"]') as HTMLElement;
			if (availableSparkle === null) {
				return;
			}
			this.#styleSparkle(availableSparkle);
			availableSparkle.dataset.animationActive = "true";
		},
			this.sparkleRate - this.sparkleVariance,
			this.sparkleRate + this.sparkleVariance
		);
	}

	#styleSparkle(sparkle: HTMLElement) {
		sparkle.style.top = randomRange(5, 105) + "%";
		sparkle.style.left = randomRange(0, 100) + "%";
		sparkle.style.zIndex = `${Math.random() > 0.5 ? 3 : -1}`;
		const sizeModifier = `calc(var(--_sparkle-base-size, 15px) / 3 * ${(Math.random() * 2) + 2})`
		sparkle.style.width = sizeModifier;
		sparkle.style.height = sizeModifier;
	}
}


function setRandomInterval(intervalCallback: () => void, minDelay: number, maxDelay: number) {
	let timeout: number;
	const runInterval = () => {
		timeout = window.setTimeout(() => {
			intervalCallback();
			runInterval();
		}, randomRange(minDelay, maxDelay));
	};

	runInterval();

	return {
		clear() {
			clearTimeout(timeout);
		}
	};
}

function randomRange(min: number, max: number) {
	const range = Math.floor(Math.random() * (max - min + 1)) + min;
	return range;
}

if ("customElements" in window) {
	window.customElements.define(SparklyText.tagName, SparklyText);
}

export { SparklyText };
