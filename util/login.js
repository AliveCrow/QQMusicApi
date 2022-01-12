/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2022-01-12 13:54:55
 * @LastEditTime: 2022-01-12 14:37:52
 */
const puppeteer = require('puppeteer')
const login = async (data) => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
  });
  try {
    const page = await browser.newPage();
    await page.goto('https://y.qq.com', {
      waitUntil: 'networkidle0'
    });
    // await page.waitForSelector('#divdialog_0 > div.popup__hd > a > i.popup__icon_close', { visible: true, timeout: 3000 })
    // try {
    //   await page.click('#divdialog_0 > div.popup__hd > a > i.popup__icon_close')
    // } catch (e) {
    //   console.error(e)
    // }
    // 点击导航登录
    // await page.click('body > div.mod_header > div > div.header__opt > span > a.top_login__link')
    await page.click('#app > div > div.mod_header > div > div.header__opt > span > a')
    const $frame_tips = await page.waitForSelector('#login_frame')
    const frame_tips = await $frame_tips.contentFrame()
    const $ptlogin_iframe = await frame_tips.waitForSelector('#ptlogin_iframe')
    const ptlogin_iframe = await $ptlogin_iframe.contentFrame()
    await ptlogin_iframe.waitForTimeout(3000)
    // 切换账户/密码登录方式
    await ptlogin_iframe.click('#switcher_plogin')
    // 等待表单展现
    await Promise.all([
      ptlogin_iframe.waitForSelector('#u', { visible: true }),
      ptlogin_iframe.waitForSelector('#p', { visible: true }),
      ptlogin_iframe.waitForSelector('#login_button', { visible: true }),
    ])
    // 登录
    await ptlogin_iframe.type('#u', data.username, { delay: 100 });
    await ptlogin_iframe.type('#p', data.password, { delay: 100 });
    await ptlogin_iframe.click('#login_button', { delay: 100 });
    // 等待登录完成
    // await page.waitForSelector('#app > div > div.mod_header > div > div.header__opt > span > a.top_login__link')
    // const frame_tips = (await page.$('#frame_tips')).contentFrame()
    // const ptlogin_iframe = (await frame_tips.$('#ptlogin_iframe')).contentFrame()
    // const $ptloginFrame = frame.contentFrame()
    // await $ptloginFrame.waitForTimeout(3000)
    await page.waitForTimeout(3000)
    let cookie = await page.evaluate(() => document.cookie);
    console.log("cookie :" + cookie);
    const cookies = await page.cookies()
    await browser.close()
    return cookie
  } catch (e) {
    await browser.close()
    throw e
  }
}

module.exports = login

// cookies you got like this:
var cookies = [
  {
    "name": "ptui_loginuin",
    "value": "[FILTER]",
    "domain": ".qq.com",
    "path": "/",
    "expires": 1615039722,
    "size": 22,
    "httpOnly": false,
    "secure": false,
    "session": false,
    "sameParty": false
  },
  {
    "name": "userAction",
    "value": "1",
    "domain": ".y.qq.com",
    "path": "/",
    "expires": 1612534115,
    "size": 11,
    "httpOnly": false,
    "secure": false,
    "session": false,
    "sameParty": false
  },
  {
    "name": "pgv_pvid",
    "value": "[FILTER]",
    "domain": ".qq.com",
    "path": "/",
    "expires": 2147385600,
    "size": 17,
    "httpOnly": false,
    "secure": false,
    "session": false,
    "sameParty": false
  },
  {
    "name": "ts_last",
    "value": "y.qq.com/",
    "domain": ".y.qq.com",
    "path": "/",
    "expires": 1612449511,
    "size": 16,
    "httpOnly": false,
    "secure": false,
    "session": false,
    "sameParty": false
  },
  {
    "name": "pgv_info",
    "value": "ssid=[FILTER]",
    "domain": ".qq.com",
    "path": "/",
    "expires": -1,
    "size": 24,
    "httpOnly": false,
    "secure": false,
    "session": true,
    "sameParty": false
  },
  {
    "name": "ts_uid",
    "value": "[FILTER]",
    "domain": ".y.qq.com",
    "path": "/",
    "expires": 1675519711,
    "size": 16,
    "httpOnly": false,
    "secure": false,
    "session": false,
    "sameParty": false
  },
  {
    "name": "yqq_stat",
    "value": "0",
    "domain": ".y.qq.com",
    "path": "/",
    "expires": -1,
    "size": 9,
    "httpOnly": false,
    "secure": false,
    "session": true,
    "sameParty": false
  }
]

