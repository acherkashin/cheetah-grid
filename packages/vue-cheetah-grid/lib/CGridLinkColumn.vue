<template>
  <!-- Use this slot to set the header caption -->
  <div class="c-grid-link-column"><slot /></div>
</template>

<script>
import ColumnMixin from './c-grid/ColumnMixin.vue'
import StdColumnMixin from './c-grid/StdColumnMixin.vue'
import { cheetahGrid, filterToFn, normalizeColumnType, girdUpdateWatcher } from './c-grid/utils'

/**
 * @mixin column-mixin
 * @mixin std-column-mixin
 */
export default {
  name: 'CGridLinkColumn',
  mixins: [ColumnMixin, StdColumnMixin],
  props: {
    /**
     * Defines a column type
     */
    columnType: {
      type: [Object, String, Function],
      default: undefined
    },
    /**
     * Defines a href
     */
    href: {
      type: [String, Function],
      default: undefined
    },
    /**
     * Defines an anchor target
     */
    target: {
      type: [String],
      default: undefined
    },
    /**
     * Defines disabled
     */
    disabled: {
      type: Boolean
    }
  },
  watch: {
    columnType: girdUpdateWatcher,
    href: girdUpdateWatcher,
    target: girdUpdateWatcher,
    disabled (disabled) {
      if (this._action) {
        this._action.disabled = disabled
      }
    }
  },
  methods: {
    /**
     * @private
     * @override
     */
    getPropsObjectInternal () {
      const props = ColumnMixin.methods.getPropsObjectInternal.apply(this)
      delete props.disabled
      return props
    },
    /**
     * @private
     */
    createColumn () {
      const { href, target = '_blank' } = this
      const action = typeof href === 'function'
        ? new cheetahGrid.columns.action.Action({
          action: href,
          disabled: this.disabled
        })
        : new cheetahGrid.columns.action.Action({
          action (rec) {
            window.open(rec[href], target)
          },
          disabled: this.disabled
        })
      const columnType = normalizeColumnType(this.columnType)

      const field = this.filter ? filterToFn(this, this.field, this.filter) : this.field
      return {
        caption: this.caption || this.$el.textContent.trim(),
        headerStyle: this.headerStyle,
        field,
        columnType,
        width: this.width,
        minWidth: this.minWidth,
        maxWidth: this.maxWidth,
        action,
        style: this.columnStyle,
        sort: this.sort,
        icon: this.icon,
        message: this.message
      }
    }
  }
}
</script>

<style scoped>
.c-grid-link-column {
  display: none;
}
</style>
