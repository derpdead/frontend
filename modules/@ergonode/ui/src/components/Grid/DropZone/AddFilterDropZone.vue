/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
<template>
    <FadeTransition>
        <DropZone
            v-show="isDropZoneVisible"
            :orientation="horizontalOrientation"
            title="ADD FILTER"
            @drop="onDropFilter">
            <template #icon="{ color }">
                <IconAddFilter :fill-color="color" />
            </template>
        </DropZone>
    </FadeTransition>
</template>

<script>
import {
    DRAGGED_ELEMENT,
} from '@Core/defaults/grid';
import {
    ORIENTATION,
} from '@Core/defaults/layout';
import DropZone from '@UI/components/DropZone/DropZone';
import IconAddFilter from '@UI/components/Icons/Actions/IconAddFilter';
import FadeTransition from '@UI/components/Transitions/FadeTransition';
import {
    mapState,
} from 'vuex';

export default {
    name: 'AddFilterDropZone',
    components: {
        FadeTransition,
        DropZone,
        IconAddFilter,
    },
    props: {
        /**
         * List of filters
         */
        filters: {
            type: Array,
            default: () => [],
        },
        /**
         * Type of the place from where element is dragging
         */
        draggingElementType: {
            type: String,
            default: DRAGGED_ELEMENT.LIST,
        },
    },
    computed: {
        ...mapState('draggable', [
            'isElementDragging',
            'draggedElement',
        ]),
        horizontalOrientation() {
            return ORIENTATION.HORIZONTAL;
        },
        isDropZoneVisible() {
            return this.isElementDragging === this.draggingElementType
                && !this.filters.some(
                    filter => filter.id === this.draggedElement,
                );
        },
    },
    methods: {
        onDropFilter(payload) {
            this.$emit('drop', payload);
        },
    },
};
</script>
