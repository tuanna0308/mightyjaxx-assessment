import BasePage from "@core/page/base.page";
import { commonLocator } from "pages/locators/common.locator";
import { homePageLocator } from "pages/locators/home.locator";


export default class HomePage extends BasePage {
    async clickBlogsLink() {
        this.click(homePageLocator.NAVIGATION_LINK(commonLocator.BLOGS));
    }

    async getHrefByLinkName(linkName: string) {
        return this.getAttribute(linkName, 'href');
    }

    async goToLink(link: string | null) {
        await this.goTo(`${link}`);

        await this.waitForPageLoad('domcontentloaded');
    }
}