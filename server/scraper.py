from selenium import webdriver
from selenium.webdriver.firefox.options import Options

options = Options()
options.add_argument("--headless")

PATH = '/home/user/scraping/geckodriver'
browser = webdriver.Firefox(executable_path=PATH, options=options)
browser.get('https://www.amazon.co.uk/dp/B07PJV3JPR/')

try:
    price = browser.find_element_by_id('priceblock_ourprice').text
    print(price)
finally:
    browser.quit()