---
order: 300
---

# MenuColumn

Maps from `value` to `caption` and display it.

To make it editable, please use [InlineMenuEditor](../column_actions/InlineMenuEditor.md).

## Constructor Properties

|Property|Description|
|---|---|
|`options`|Define mapping options.|

## Style Properties

|Property|Description|Default|
|---|---|---|
|`appearance`|Defines whether to display a dropdown arrow. (you can set `'menulist-button'` or `'none'`) |`'menulist-button'`|

In addition to this, Standard styles is available.

- [Standard Column Style](../column_styles.md)

<code-preview>

```html
<div class="sample1 demo-grid small"></div>
```

```js
const options = [
  {value: '', caption: 'Empty'},
  {value: '1', caption: 'Option 1'},
  {value: '2', caption: 'Option 2'},
  {value: '3', caption: 'Option 3'},
  {value: '4', caption: 'Option 4'},
  {value: '5', caption: 'Option 5'},
  {value: '6', caption: 'Option 6'},
  {value: '7', caption: 'Option 7'},
];
const grid = new cheetahGrid.ListGrid({
  parentElement: document.querySelector('.sample1'),
  header: [
    {
      field: 'sel',
      caption: 'MenuColumn',
      width: 260,
      columnType: new cheetahGrid.columns.type.MenuColumn({options}),
    },
    {
      field: 'sel2',
      caption: 'style',
      width: 260,
      columnType: new cheetahGrid.columns.type.MenuColumn({options}),
      style: {appearance: 'none'},
    },

    {
      caption: 'show',
      width: 100,
      columnType: new cheetahGrid.columns.type.ButtonColumn({
        caption: 'SHOW',
      }),
      action: new cheetahGrid.columns.action.ButtonAction({
        action(rec) {
          alert(JSON.stringify(rec, null, '  '));
        },
      }),
    }


  ],
});
grid.records = [
  {sel: '', sel2: ''},
  {sel: '1', sel2: '1'},
  {sel: '2', sel2: '2'},
  {sel: '3', sel2: '3'},
  {sel: '', sel2: ''},
  {sel: '1', sel2: '1'},
  {sel: '2', sel2: '2'},
  {sel: '3', sel2: '3'},
  {sel: '', sel2: ''},
  {sel: '1', sel2: '1'},
  {sel: '2', sel2: '2'},
  {sel: '3', sel2: '3'},
];
```

</code-preview>