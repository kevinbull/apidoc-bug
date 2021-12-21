## Filters
Filters can be posted to listing api endpoints. A filter is sent in the payload in a "filter" key.
Some listing api's may not accept a filter, but most of them do.

#### Filter Object
The filter object is made up of a type field and one or more condition objects.
The following fields comprise a filter object.
Name | Type | Description | Acceptable Values
--- | --- | --- | ---
type | String | how to join condition objects, only required if more than one condition object is provided | ``AND``, ``OR``
conditions | Array | object that defines the qualification | ```{name: '', comparator: '', values: []}```, ```{type: '', conditions: []}```

A filter object in its simplest form
```
{
  "filter": {
    "type": "and",
    "conditions": [
        {
          "name": "firstName",
          "comparator": "is equal to",
          "values": [
             "Jim"
           ],
           "not": false
        }
    ]
  }
}
```

#### Condition Object
The condition object is made up of the following fields.
Name | Type | Description | Acceptable Values
--- | --- | --- | ---
name | String | field name to use in the condition | any field name associated with the collection entities
comparator | String | how to compare the field to the values array | one of the valid comparators explained below
values | Array | list of values to be compared against the field | string, numbers or date values
not | boolean | field to negate the condition block | boolean values (0, '0', 1, '1', false, 'false', true, 'true')
json_field | string | field to indicate the json column in the DB  | a valid json field, name is used as the json path

A condition object will take this basic form
```
{
    "name": "sections[*].field",
    "comparator": "intersects",
    "json_field": "json_form",
    "values": [
        "New Template.Settings"
    ],
    "not": false
}
```

If a nested condition is desired the condition object may be
replaced by a filter object minus the "filter" property.
```
"filter": {
  "type": "and",
  "conditions": [
    {
      "type": "or",
      "conditions": [
       {
         "name": "vendor",
         "comparator": "is not equal to",
         "values": [
           "BogusVendor"
         ]
       },
       {
         "name": "feature_count",
         "comparator": "is between",
         "values": [
           "10",
           "90"
         ]
       }
     ]
    },
    {
      "name": "region",
      "comparator": "contains",
      "values": [
         "us"
       ]
    },
    {
      "name": "version_date_first_used",
      "comparator": "is greater than",
      "values": [
        "8/11/2020"
      ]
    }
  ]
}
```

#### Comparators
There are a large number of comparators available for condition objects. Some comparators
expect multiple values, others will ignore values other than the first one and a few take no values at all.
Comparator | Description
--- | ---
contains | any value in the values array is contained within the specified field
intersects | any value in the values array has an intersection with a json field
does not contain | any value in the values array is not contained within the specified field
is equal to | the value in the values array is exactly equal to the specified field (Expects 1 value in values array)
is not equal to | the value in the values array is is not equal to the specified field (Expects 1 value in values array)
startsWith | the specified field starts with the value in the values array
endsWith | the specified field ends with the value in the values array
is greater than | the value in the values array is greater than the specified field (alphabetically, numerically, or date) (Expects 1 value in values array)
is greater than or equal | the value in the values array is greater than or equal to the specified field (alphabetically, numerically, or date) (Expects 1 value in values array)
is less than | the value in the values array is less than the specified field (alphabetically, numerically, or date) (Expects 1 value in values array)
is less than or equal | the value in the values array is less than or equal to the specified field (alphabetically, numerically, or date) (Expects 1 value in values array)
is between | the value of the specified field is between the two values in the condition values array (alphabetically, numerically, or date) (Expects 2 values in values array)
is not between | the value of the specified field is not between the two values in the condition values array (alphabetically, numerically, or date) (Expects 2 values in values array)
is one of | at least one value in the values array is equal to the value of the specified field
is not one of | every value in the values array is not equal to the value of the specified field
is blank | specified field has no value or is an empty string (Expects 0 values in values array)
is not blank | specified field has any value at all (Expects 0 values in values array)
today | specified field value is today. "today" (date fields only) (Expects 0 values in values array)
this month | specified field value is in this month. "this month" (date fields only) (Expects 0 values in values array)
year to date | specified field value is between jan 1 and today. "today" (date fields only) (Expects 0 values in values array)
last (x) days | specified field value is within last (x) days of today. "today" (date fields only) (Expects 1 value in values array)
last (x) months | specified field value is within last (x) months of today. "today" (date fields only) (Expects 1 value in values array)
next (x) days | specified field value is within the next (x) days of today. "today" (date fields only) (Expects 1 value in values array)
next (x) months | specified field value is within the next (x) months of today. "today" (date fields only) (Expects 1 value in values array)

#### Example Filters
Fetch template configurations where any section has a field called "New Template.Settings".
```
API: /api/configuration/list

"filter": {
  "type": "and",
  "conditions": [
    {
        "name": "sections[*].field",
        "comparator": "intersects",
        "json_field": "json_form",
        "values": [
            "New Template.Settings"
        ]
    }
  ]
}
```
