#!/bin/bash

API="http://localhost:4741"
URL_PATH="/groceries"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "list": {
      "nameofood": "'"${NAMEOFFOOD}"'",
      "dateofpurchase": "'"${DATEOFPURCHASE}"'",
      "quantity": "'"${QUANTITY}"'",
      "category": "'"${CATEGORY}"'"
    }
  }'

echo
