/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <GridTableCell
        :column="column"
        :row="row"
        :selected="selected"
        :disabled="disabled"
        :edit-key-code="32"
        @mousedown.native="onEdit"
        @edit="onEdit">
        <IconEdit v-once />
    </GridTableCell>
</template>

<script>
import GridTableCell from '@UI/components/Grid/Layout/Table/Cells/GridTableCell';
import IconEdit from '@UI/components/Icons/Actions/IconEdit';

export default {
    name: 'GridEditActionCell',
    components: {
        GridTableCell,
        IconEdit,
    },
    props: {
        /**
         * Unique row identifier
         */
        rowId: {
            type: [
                String,
                Number,
            ],
            required: true,
        },
        /**
         * Determines if component is selected
         */
        selected: {
            type: Boolean,
            default: false,
        },
        /**
         * Determinate if the component is disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * URL of backend endpoint
         */
        href: {
            type: String,
            required: true,
        },
        /**
         * Index of the column
         */
        column: {
            type: Number,
            required: true,
        },
        /**
         * Index of the row
         */
        row: {
            type: Number,
            required: true,
        },
    },
    methods: {
        onEdit(event) {
            if (event.which === 3) {
                return;
            }

            if (!this.isDisabled) {
                const args = this.href.split('/');

                this.$emit('action', {
                    key: 'edit',
                    value: args,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .icon {
        padding: 4px;
    }
</style>
