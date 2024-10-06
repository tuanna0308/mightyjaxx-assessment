import BasePage from "@core/page/base.page";
import { commonLocator } from "pages/locators/common.locator";

export default class CommonPage extends BasePage {
    async closePopupIfDisplayed() {
        if (await this.countLocator(commonLocator.POPUP_CLOSE_BUTTON) > 0) {
            await this.click(commonLocator.POPUP_CLOSE_BUTTON);
        }
    }
}