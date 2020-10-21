#!/bin/bash
echo -e '\Test ScrapeAmazon:\n'
python3 -c "import scraper; item = scraper.ScrapeAmazon('https://www.amazon.com/dp/B07YMJ9WFN'); print(item)"