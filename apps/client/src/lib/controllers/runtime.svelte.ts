import { ThemeController } from "./theme";

export const runtime = $state<{
    themeManager: ThemeController;
    signedIn: boolean;
    sidebarIsOpen: boolean;
}>({
    themeManager: new ThemeController(),
    signedIn: false,
    sidebarIsOpen: false,
});
