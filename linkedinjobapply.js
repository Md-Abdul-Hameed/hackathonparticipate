const path = require("path");
let puppeteer = require("puppeteer");

(async function fn() {
    browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"]
});
   
    try{
        allTabs = await browserInstance.pages();
        cTab = allTabs[0];
        await cTab.goto("https://www.linkedin.com");
        await cTab.type("input[autocomplete='username']","hameeieed@outlook.com");
        await cTab.type("input[autocomplete='current-password']","password123");
        await cTab.click(".sign-in-form__submit-button");
       
        await cTab.waitForSelector("a[data-test-global-nav-link='jobs']",{visible:true});
        await cTab.click("a[data-test-global-nav-link='jobs']");

        await cTab.waitFor(1000);

        await cTab.waitForSelector("a[data-control-name='A_jobshome_job_link_click']",{visible:true});
        await cTab.click("a[data-control-name='A_jobshome_job_link_click']");

        await cTab.waitForSelector(".jobs-search-box__submit-button.artdeco-button.artdeco-button--2.artdeco-button--secondary");
        await cTab.click(".jobs-search-box__submit-button.artdeco-button.artdeco-button--2.artdeco-button--secondary");
        await cTab.waitFor(500);
        await cTab.waitForSelector("[aria-label='Easy Apply filter.']",{visible:true});
        await cTab.click("[aria-label='Easy Apply filter.']");

        await cTab.waitFor(1000);        
    
        await cTab.waitForSelector("[aria-checked='true'][aria-label='Easy Apply filter.']",{visible:true});
        
        await cTab.waitForSelector(".jobs-search-results__list.list-style-none .full-width.artdeco-entity-lockup__title.ember-view a",{visible:true});
        let linkarr = await cTab.evaluate(consoleFn);

        
         for(let i = 0; i < linkarr.length -1 ; i++){
            apply(linkarr[i]);
        }
       
    }
    catch(err){
        console.log(err);
    }


})();
//C:\Users\LENOVO\Documents\res
async function apply(link){
    try{
        await cTab.goto("https://www.linkedin.com"+link);
        await cTab.waitForSelector(".grid__col.grid__col--xl-7.right-rail",{visible:true});
        await cTab.waitForSelector(".jobs-box__body.jobs-post-job__title",{visible:true});
        await cTab.waitForSelector(".jobs-s-apply.jobs-s-apply--fadein.inline-flex.mr2",{visible:true});
        await cTab.waitForSelector(".jobs-apply-button--top-card",{visible:true});
        await cTab.click(".jobs-apply-button--top-card");
        
        await cTab.waitForSelector(".fb-single-line-text input[name='urn:li:fs_easyApplyFormElement:(urn:li:fs_normalized_jobPosting:2504827695,9,phoneNumber~nationalNumber)']",{visible:true});
        await cTab.type(".fb-single-line-text input[name='urn:li:fs_easyApplyFormElement:(urn:li:fs_normalized_jobPosting:2504827695,9,phoneNumber~nationalNumber)']","9191919999");
        
        await cTab.waitForSelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view",{visible:true});
         await cTab.click(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view");
         
        const [filechooser] = await Promise.all([
             cTab.waitForFileChooser(),
             cTab.click(".artdeco-button.artdeco-button--secondary.artdeco-button--2.mt2")
         ])

         await filechooser.accept(['./res.docx']);

         await cTab.waitForSelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view",{visible:true});
         await cTab.click(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view")

         await cTab.waitForSelector(".fb-radio.display-flex [value='Yes']",{visible:true});
         await cTab.click(".fb-radio.display-flex [value='Yes']");

         await cTab.waitForSelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view",{visible:true});
         await cTab.click(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view")

         await cTab.waitForSelector(".fb-radio.display-flex [value='Yes']",{visible:true});
         await cTab.click(".fb-radio.display-flex [value='Yes']");

         await cTab.waitForSelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view",{visible:true});
         await cTab.click(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view");


         await cTab.waitForSelector("button[aria-label='Submit application']",{visible:true});
         await cTab.click("button[aria-label='Submit application']");

    }catch(err){
        console.log(err);
    }
}

async function waitAndClick(selector){
       await cTab.waitForSelector(selector,{visible:true});
       await cTab.click(selector);
}
//document.querySelector(".jobs-search-results__list-item.occludable-update.p0.relative.ember-view a").getAttribute("href")
function consoleFn() {
    let elem = document.querySelectorAll(".jobs-search-results__list.list-style-none .full-width.artdeco-entity-lockup__title.ember-view a");
     let arr = [];

     for(let i = 0; i < elem.length; i++){
        arr.push(elem[i].getAttribute("href"));
     }
    return arr;
}