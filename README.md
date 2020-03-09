# Vue.js cost management system

With this application you can track and plan your expenses.

Project demo is available at https://crm-vue-js.firebaseapp.com/

To access system you should **register** or just **use this login data**:

> Email: test@gmail.com
>
> Password: 123456

## Navigation

- [Description](#what-is-it-all-about)
- [Technical Information](#technical-information)

## What is it all about?

### Dashboard page

On the dashboard page, you can view your bill in various currencies.
You can customize the currencies you are interested in on the profile page.

Also here you can see the exchange rates to the euro with an hourly update.
Currency rates are taken from the service https://prime.exchangerate-api.com using the API

### Profile page

On the profile page you can change:

- **Your name**
- **Tracked currencies** (displayed on the dashboard page)
- **Base currency**. All expenses and income are calculated in this currency. 
    Your tracked currencies bill are calculated on this value

You can also sort tracked currencies by dragging it.

More profile customizing features will be available in the future

### Categories page

Work with the system starts with this page. 

Here you should create a category (for income, outcome, both). Come up with a name and specify a money spending limit.
For example, category **Food** with **1000** limit.

After creating a category, you can edit it.

Now you can keep track of your outcome and income, proceed to New Post page

### New Post page

Here you can record all your outcome and income.

You should select a category, type (income or outcome), enter the amount and description.

You will not be able to create a record if the specified amount exceeds your bill

After the post is created it gets to the history page, your bill changes depending on the specified amount.

### Planning page

On this page, you can view your expenses by category. 

By hovering the progress bar, you can see how much you can spend on this category

### History page

The history page stores all your records. You can click on record to see its details. For convenience, pagination is introduced. 

Also for clarity there is a chart with expenses by categories.

## Technical information

#### What was used:

- Vuex
- Vue router. Routes have route guard
- Materialize css
- Vue-i18n for localization (English, Russian). By default is russian, when register locale is taken from the database
- Firebase
- For other used packages see package.json

#### Directives

**Tooltip**

*args: left, right, top, bottom*

Usage:
````
v-tooltip:left="I am a tooltip"
````

#### Filters

**Currency filter**

Transforming a number to readable currency value

*Args (optional):*
 
 - *Currency you want transform (string). For example 'EUR'. By default user base currency*

Usage:
````
1000 | currencyFilter('EUR')
output: €1000.00
````

**Date filter**

Transforming a date to readable format. Date format depends on the locale as well

*Args:*
 
 - *date (string)*
 - *time (string)*
 - *datetime (string)*

Usage:
````
new Date() | dateFilter('datetime')
output example: March 09, 2020, 10:47:34 PM
````

#### Other

- Mixin Pagination. Uses *vuejs-paginate* package
- Different layouts for main system and auth pages
- Custom alert plugin *(this.$alert/$error('I am an alert'))*
- Server errors handling. Errors pops up with alert plugin
- Loader component

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
