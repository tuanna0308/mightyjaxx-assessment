export const homePageLocator = {
    NAVIGATION_LINK: (linkName: string): string => `//h2[text()='${linkName}']/parent::a`,
};