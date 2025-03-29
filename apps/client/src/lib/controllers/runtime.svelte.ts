import { ThemeController } from "./theme";

export const runtime = $state<{ themeManager: ThemeController }>({
    themeManager: new ThemeController(),
});
