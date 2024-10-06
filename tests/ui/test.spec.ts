import { UI_TEXT } from '@core/constants/ui.text';
import { test, expect } from '@fixtures/page.fixture'
import { commonLocator } from 'pages/locators/common.locator';
import { homePageLocator } from 'pages/locators/home.locator';

test.describe('Mighty Jaxx Assessment', () => {
    test('Test link to About Us and Blogs page', async ({ page, baseURL, commonPage, homePage, aboutUsPage, blogPage }, testInfo) => {
        // 1. Goes to https://www.mightyjaxx.com
        await homePage.goToLink(`${baseURL}`);

        await expect(page).toHaveURL(`${baseURL}`);
        expect(await homePage.getPageTitle()).toEqual(UI_TEXT.MIGHTY_JAXX_PAGE_TITLE);

        await commonPage.closePopupIfDisplayed();

        // 2. Looks for the hyperlink ‘About Us’
        let link = await homePage.getHrefByLinkName((homePageLocator.NAVIGATION_LINK(commonLocator.ABOUT_US)));

        // 3. Then goes to the URL of that link
        await homePage.goToLink(link);

        await expect(page).toHaveURL(`${link}`);
        expect(await aboutUsPage.getPageTitle()).toEqual(UI_TEXT.MIGHTY_JAXX_GROUP_PAGE_TITLE);

        // 4. Takes a screenshot of the website contents, after going to the new page
        await aboutUsPage.attach(testInfo, 'Mighty Jaxx Group page', { body: await aboutUsPage.screenshot({ fullPage: true }), contentType: 'image/png' });

        // 5. Next, goes back to https://www.mightyjaxx.com again
        await aboutUsPage.goBack();

        await homePage.waitForPageLoad('domcontentloaded', { timeout: 5000 });

        await expect(page).toHaveURL(`${baseURL}`);
        expect(await homePage.getPageTitle()).toEqual(UI_TEXT.MIGHTY_JAXX_PAGE_TITLE);

        await commonPage.closePopupIfDisplayed();

        // 6. Look for the ‘Blogs’ link 
        const blogsLink = await homePage.getHrefByLinkName(homePageLocator.NAVIGATION_LINK(commonLocator.BLOGS));

        // 7. Goes to the blogs URL
        await homePage.clickBlogsLink();

        await homePage.waitForPageLoad('domcontentloaded');

        await expect(page).toHaveURL(`${blogsLink}`);
        expect(await blogPage.getPageTitle()).toEqual(UI_TEXT.BLOGS_PAGE_TITLE);

        // 8. Takes a screenshot of the blogs page
        await blogPage.attach(testInfo, 'Blogs page', { body: await blogPage.screenshot({ fullPage: true }), contentType: 'image/png' });
    })
});