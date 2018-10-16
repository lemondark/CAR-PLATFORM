<!-- 
author:zhangxiahui
time:20180913
desc:终端升级 
-->
<template>
    <div class="bgcolor">
        <div class="content">
            <div class="hy-tool-kong"></div>
            <Form ref="terminalForm" :model="terminalForm" :rules="ruleValidate" :label-width="150">
                <FormItem label="设置VIN码" prop="vins" style="width:60%">
                    <Input v-model="terminalForm.vins" type="textarea" :autosize="{minRows: 2}" placeholder="VIN码"></Input>
                </FormItem>
                <FormItem label="设置服务器" prop="serverId" style="width:35%">
                    <Select v-model="terminalForm.serverId" placeholder="选择服务器">
                        <Option v-for="item in serverOptions" :value="item.value" :key="item.value" :label="item.label"></Option>
                    </Select>
                </FormItem>
                <FormItem label="车载终端制造商ID" prop="terminalId" style="width:35%">
                    <Input v-model="terminalForm.terminalId" placeholder=""></Input>
                </FormItem>
                <FormItem label="升级URL地址" prop="upgradeUrl" style="width:35%">
                    <Input v-model="terminalForm.upgradeUrl" placeholder=""></Input>
                </FormItem>
                <FormItem label="连接到升级服务器时限" prop="timeLimit" style="width:35%">
                    <Input v-model="terminalForm.timeLimit" :maxlength="2" placeholder="" number></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" @click="handleSave('terminalForm')">
                        <span v-if="!loading">保存</span>
                        <span v-else>保存中...</span>
                    </Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import { upgradeSave, getServerList } from '@/service/otaUpgrade/otaUpgradeRecord';
    export default {
        data () {
            return {
                terminalForm: {},
                loading: false,
                ruleValidate: {
                    vins: [
                        { required: true, message: 'VIN码不能为空', trigger: 'blur' },
                        { type: 'string', min: 17, max: 8999, message: 'VIN码不能少于1个且不能多于500个', trigger: 'blur' }
                    ],
                    serverId: [
                        { required: true, message: '请选择服务器', trigger: 'change' }
                    ],
                    terminalId: [
                        { required: true, message: '车载终端制造商ID不能为空', trigger: 'blur' },
                        { type: 'string', max: 4, message: 'ID不能超过5位', trigger: 'blur' }
                    ],
                    upgradeUrl: [
                        { required: true, message: '升级URL地址不能为空', trigger: 'blur' }
                    ],
                    timeLimit: [
                        { required: true, type: 'number', message: '时限必须为数字且不能为空', trigger: 'blur' }
                    ]
                },
                serverOptions: []
            };
        },
        created () {
            this.getServer();
        },
        methods: {
            getServer () {
                getServerList({}, res => {
                    const server = [];
                    res.forEach(item => {
                        server.push({value: item.id, label: item.serverName});
                    });
                    this.serverOptions = server;
                });
            },
            handleSave (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        upgradeSave({}, this.terminalForm, res => {
                            this.loading = false;
                            this.$confirm('提交VIN成功,在升级记录中查看终端远程升级情况！', {
                                showConfirmButton: false,
                                showCancelButton: false,
                                type: 'success'
                            }).then(() => {
                            }).catch(() => {
                            });
                        }, ret => {
                            this.loading = false;
                            let text = '保存操作失败！';
                            if (ret) text = ret;
                            this.$confirm(text, {
                                showConfirmButton: false,
                                showCancelButton: false,
                                type: 'error'
                            }).then(() => {
                            }).catch(() => {
                            });
                        });
                    }
                });
            }
        }
    };
</script>