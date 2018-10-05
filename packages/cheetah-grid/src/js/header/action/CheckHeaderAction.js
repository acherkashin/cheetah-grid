'use strict';

const {obj: {setReadonly}, isDef} = require('../../internal/utils');
const {bindCellClickAction, bindCellKeyAction} = require('./actionBind');
const animate = require('../../internal/animate');

const BaseAction = require('./BaseAction');
const {CHECK_HEADER_STATE_ID} = require('../../internal/symbolManager');

const KEY_ENTER = 13;
const KEY_SPACE = 32;

class CheckHeaderAction extends BaseAction {
	constructor(option = {}) {
		super(option);
		this._action = option.onChecked;
		this._initChecked = !!option.initChecked;
	}
	clone() {
		return new CheckHeaderAction(this);
	}
	_executeAction(checked, col, grid) {
		if (typeof this._action === 'function') {
			this._action({checked, col, grid});
		} else {
			// TODO
			// grid.dataSource.sort(grid.getField(newState.col), newState.order);
		}
	}
	bindGridEvent(grid, range) {
		if (!grid[CHECK_HEADER_STATE_ID]) {
			setReadonly(grid, CHECK_HEADER_STATE_ID, {});
		}
		const state = grid[CHECK_HEADER_STATE_ID];

		const cellKey = `${range.startCol}:${range.startRow}`;
		const checkedKey = `${cellKey}::checked`;
		if (!isDef(state[checkedKey])) {
			state[checkedKey] = this._initChecked;
		}

		const action = (cell) => {
			const cellKey = `${cell.col}:${cell.row}`;
			const blockKey = `${cellKey}::block`;
			const elapsedKey = `${cellKey}::elapsed`;
			const checkedKey = `${cellKey}::checked`;
			if (this.disabled || state[blockKey]) {
				return;
			}
			if (!isDef(state[checkedKey])) {
				state[checkedKey] = this._initChecked;
			}
			const checked = (state[checkedKey] = !state[checkedKey]);

			const onChange = () => {
				// checkbox animation
				animate(200, (point) => {
					if (point === 1) {
						delete state[elapsedKey];
					} else {
						state[elapsedKey] = point;
					}
					grid.invalidateGridRect(range.startCol, range.startRow, range.endCol, range.endRow);
				});
			};
			onChange();

			this._executeAction(checked, range.startCol, grid);
		};
		return [
			...bindCellClickAction(grid, range, {
				action,
				mouseOver: (e) => {
					if (this.disabled) {
						return false;
					}
					state.mouseActiveCell = {
						col: e.col,
						row: e.row
					};
					grid.invalidateCell(e.col, e.row);
					return true;
				},
				mouseOut: (e) => {
					delete state.mouseActiveCell;
					grid.invalidateCell(e.col, e.row);
				},
			}),
			...bindCellKeyAction(grid, range, {
				action,
				acceptKeys: [KEY_ENTER, KEY_SPACE],
			})
		];
	}
}

module.exports = CheckHeaderAction;
