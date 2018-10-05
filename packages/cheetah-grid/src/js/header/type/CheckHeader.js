'use strict';


const {isDef} = require('../../internal/utils');
const BaseHeader = require('./BaseHeader');
const CheckHeaderStyle = require('../style/CheckHeaderStyle');
const {CHECK_HEADER_STATE_ID} = require('../../internal/symbolManager');

class CheckHeader extends BaseHeader {
	get StyleClass() {
		return CheckHeaderStyle;
	}
	clone() {
		return new CheckHeader(this);
	}
	// convertInternal(value) {
	// 	return toBoolean(value);
	// }
	drawInternal(value, context, style, helper, grid, {drawCellBase}) {
		const {
			textAlign,
			textBaseline,
			borderColor,
			checkBgColor,
			uncheckBgColor,
			bgColor,
			color,
			font,
			textOverflow,
		} = style;
		if (bgColor) {
			drawCellBase({
				bgColor,
			});
		}

		const {col, row} = context;
		const cellKey = `${col}:${row}`;
		const elapsedKey = `${cellKey}::elapsed`;
		const checkedKey = `${cellKey}::checked`;
		const {[elapsedKey]: elapsed, [checkedKey]: checked} = grid[CHECK_HEADER_STATE_ID] || {};

		const opt = {
			textAlign,
			textBaseline,
			borderColor,
			checkBgColor,
			uncheckBgColor,
		};
		if (isDef(elapsed)) {
			opt.animElapsedTime = elapsed;
		}
		const inlineCheck = 	helper.buildCheckBoxInline(!!checked, context, opt);

		helper.text([inlineCheck, value], context, {
			textAlign,
			textBaseline,
			color,
			font,
			textOverflow,
		});
	}
	bindGridEvent(grid, col, util) {
		return [];
	}
}

module.exports = CheckHeader;
