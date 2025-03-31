import { ThemeController } from "./theme";

export const runtime = $state<{
    themeManager: ThemeController;
    signedIn: boolean;
}>({
    themeManager: new ThemeController(),
    signedIn: false,
});
