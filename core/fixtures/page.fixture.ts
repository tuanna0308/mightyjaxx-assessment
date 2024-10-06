import { test as base } from "@playwright/test";
import AboutUsPage from "@pageObjects/about-us.page";
import BlogPage from "@pageObjects/blogs.page";
import HomePage from "@pageObjects/home.page";
import CommonPage from "@pageObjects/common.page";

type PageFixture = {
    commonPage: CommonPage;
    homePage: HomePage;
    blogPage: BlogPage;
    aboutUsPage: AboutUsPage;
}

export const test = base.extend<PageFixture>({
    commonPage: async ({ page }, use) => {
        await use(new CommonPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    blogPage: async ({ page }, use) => {
        await use(new BlogPage(page));
    },
    aboutUsPage: async ({ page }, use) => {
        await use(new AboutUsPage(page))
    }
});

export { expect } from '@playwright/test';