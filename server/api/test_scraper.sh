#!/bin/bash
echo -e '\nTest ScrapeAmazon:\n'
python3 -c "import scraper; item = scraper.ScrapeAmazon('https://www.amazon.com/dp/B07YMJ9WFN'); item2 = scraper.ScrapeAmazon('https://www.amazon.com/dp/B07FCMKK5X'); print(item); print(item2)"