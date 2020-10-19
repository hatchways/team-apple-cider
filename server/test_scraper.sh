#!/bin/bash

singleURL="https://www.amazon.com/dp/B081FZV45H"
multipleURLs=(\
    "https://www.amazon.co.uk/dp/B07PJV3JPR" \
    "https://www.amazon.co.uk/dp/B07WMKZZXL" \
    "https://www.amazon.co.uk/dp/B08H95Y452" \
)
urlArray=$(printf '%s\n' "${multipleURLs[@]}" | jq -R . | jq -s . | tr -d '\040\011\012\015')

echo -e '\nSingle item using string input:\n'
python3 -c "import scraper; item = scraper.scrapeAmazon('${singleURL}'); print(item)"
echo -e '\nMultiple items using array input:\n'
python3 -c "import scraper; items = scraper.scrapeAmazon(${urlArray}); [print(item) for item in items]"
