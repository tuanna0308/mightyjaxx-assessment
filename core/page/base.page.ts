import { Locator, Page, TestInfo } from "@playwright/test";


export default class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async closePage(): Promise<void> {
        await this.page.close();
    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }

    async reloadPage(): Promise<void> {
        await this.page.reload();
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async getAttribute(selector: string, attribute: string): Promise<string | null> {
        return await this.locator(selector).getAttribute(attribute);
    }

    getPageUrl(): string {
        return this.page.url();
    }

    locator(selector: string): Locator {
        return this.page.locator(selector);
    }

    countLocator(selector: string): Promise<number> {
        return this.locator(selector).count();
    }

    async screenshot(options?: {
        animations?: 'disabled' | 'allow',
        fullPage?: boolean,
        type?: 'png' | 'jpeg',
        timeout?: number
    }): Promise<Buffer> {
        return this.page.screenshot(options);
    }

    async waitForPageLoad(
        state?: "load" | "domcontentloaded" | "networkidle",
        options?: {
            timeout?: number;
        },
    ): Promise<BasePage> {
        await this.page.waitForLoadState(state, options);
        return this;
    }

    async attach(testInfo: TestInfo, text: string, body: {
        body?: Buffer,
        contentType?: string,
        path?: string
    }): Promise<void> {
        await testInfo.attach(text, body);
    }

    async click(selector: string): Promise<void> {
        await this.locator(selector).click();
    }
}