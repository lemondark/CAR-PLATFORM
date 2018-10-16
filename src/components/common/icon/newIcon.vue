<template>
    <div :class="[prefixCls]">
        <div :class="[prefixCls + '-rel']" ref="reference">
            <i :class="classes" @click="handleClick" :style="styles" @mouseenter="handleShowPopper" @mouseleave="handleClosePopper"></i>
        </div>
        <transition name="fade">
            <div
                :class="[prefixCls + '-popper']"
                ref="popper"
                v-show="!disabled && (visible || always)"
                :data-transfer="showTransfer"
                v-transfer-dom>
                <div :class="[prefixCls + '-content']">
                    <div :class="[prefixCls + '-arrow']"></div>
                    <div :class="[prefixCls + '-inner']"><slot name="content">{{ content }}</slot></div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Popper from '../../../js/core/utils/popper';
    import TransferDom from '../../../js/core/directives/transfer-dom';
    import { oneOf } from '../../../js/core/utils/assist';
    const prefixCls = 'ivu-tooltip';
    export default {
        name: 'newIcon',
        directives: { TransferDom },
        mixins: [Popper],
        props: {
            type: String,
            color: String,
            size: [Number, String],
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'top'
            },
            content: {
                type: [String, Number],
                default: ''
            },
            delay: {
                type: Number,
                default: 100
            },
            disabled: {
                type: Boolean,
                default: false
            },
            controlled: {    // under this prop,Tooltip will not close when mouseleave
                type: Boolean,
                default: false
            },
            always: {
                type: Boolean,
                default: false
            },
          showTransfer: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                prefixCls: prefixCls
            };
        },
        watch: {
            content () {
                this.updatePopper();
            }
        },
        methods: {
            handleClick (ev) {
                this.$emit('click', ev);
            },
            handleShowPopper () {
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.visible = true;
                }, this.delay);
            },
            handleClosePopper () {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                    if (!this.controlled) {
                        this.timeout = setTimeout(() => {
                            this.visible = false;
                        }, 100);
                    }
                }
            }
        },
        computed: {
            classes () {
                 if (this.type) {
                     return `iconfont icon-${this.type}`;
                 }
                // return [
                //    prefixCls,
                //     {
                //         [`${this.type}`]: !!this.type
                //     }
                // ];
            },
            styles () {
                let style = {};
                if (this.color) {
                    style.color = this.color;
                }
                if (this.size) {
                    style['font-size'] = `${this.size}px`;
                }
                return style;
            }
        },
        mounted () {
            if (this.always) {
                this.updatePopper();
            }
        }
    };
</script>