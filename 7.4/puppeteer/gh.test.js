let page;

beforeEach(async () => {
  page = await browser.newPage();    
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {    
    await page.goto("https://github.com/team");    
  }, 50000);

  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual("GitHub for teams · Build like the best teams on the planet · GitHub");
  }, 50000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 50000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true      
    }, 50000);
    
    const actual = await page.$eval(btnSelector, link => link.textContent, { timeout: 4000 });
    expect(actual).toContain("Get started with Team")
  }, 50000);


test("GitHub pricing title content", async () => { 
  await page.goto("https://github.com/pricing");

  await page.waitForSelector('h1');    
  const title = await page.title();
  
  expect(title).toEqual("Pricing · Plans for every developer · GitHub");
}, 50000);

test("GutHub pricing header content", async () => {
  await page.goto("https://github.com/pricing");
  const h1 = await page.$eval("h1.h2-mktg", (header) => header.textContent);    
  
  expect(h1).toContain("Get the complete");
}, 50000);

test("GitHub Join header content", async () => { 
  await page.goto("https://github.com/pricing"); 
  await page.click("[test_selector='plan-input-business']");  
  await page.waitForTimeout(1000);
  const h1 = await page.$eval("h1.h1", (header) => header.textContent);    
  
  expect(h1).toEqual("First, let's create your user account");   
}, 50000);

});