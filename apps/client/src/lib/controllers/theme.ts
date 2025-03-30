export type Theme = "light" | "dark" | "system";

export class ThemeController {
    private _theme: Theme = "light";

    constructor() {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", (event) => {
                const newColorScheme = event.matches ? "dark" : "light";
                this.#manageTheme(newColorScheme);
            });
    }

    /**
     * @author SoSweetHam
     * @param theme The theme to set
     * @description Manages the theme of the whole application, and emits a 'setTheme' event
     * @returns A promise of void
     */
    async #manageTheme(theme: Theme) {
        if (this._theme === theme) return;

        document.documentElement.classList.remove("light", "dark", "system");
        if (theme === "system") {
            if (window?.matchMedia?.("(prefers-color-scheme: dark)").matches) {
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add("dark", "system");
            } else {
                document.documentElement.classList.remove("light", "dark");
                document.documentElement.classList.add("light", "system");
            }
            window.localStorage.setItem("theme", "system");
        } else {
            document.documentElement.classList.add(theme);
            window.localStorage.setItem("theme", theme);
        }
        this._theme = theme;
        this.#emitThemeEvent(theme);
    }

    /**
     * @author SoSweetHam
     * @param value The theme to emit
     * @description Emits a 'setTheme' event
     */
    #emitThemeEvent(value: Theme) {
        const event = new CustomEvent("setTheme", {
            detail: { theme: value },
        });
        window.dispatchEvent(event);
    }

    /**
     * @author SoSweetHam
     * @description Gets the current theme
     * @returns The current theme
     */
    get theme() {
        if (document.documentElement.classList.contains("system")) {
            this._theme = "system";
            return "system";
        }
        if (document.documentElement.classList.contains("dark")) {
            this._theme = "dark";
            return "dark";
        }
        this._theme = "light";
        return "light";
    }

    /**
     * @author SoSweetHam
     * @description Gets the computed theme, which simplifies light/dark/system to light/dark
     * @returns The computed theme
     */
    get computedTheme() {
        if (document.documentElement.classList.contains("dark")) {
            this._theme = "dark";
            return "dark";
        }
        this._theme = "light";
        return "light";
    }

    /**
     * @author SoSweetHam
     * @description Sets the theme
     * @param value The theme to set
     */
    set theme(value: Theme) {
        this.#manageTheme(value);
    }
}
