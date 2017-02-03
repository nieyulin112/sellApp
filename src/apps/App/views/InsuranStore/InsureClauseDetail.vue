<template lang="html">
    <div class="insure-clause-detail">
        <div class="title">{{insureClause[index].termsName?(insureClause[index].termsName + '详细内容'):'标题'}}</div>
        <div class="image">
            <img :src="insureClause[index].imageUrl" />
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        insureClause () {
            return this.$store.state.insure.insureClause
        },
        index () {
            return this.$route.params.index
        }
    }
}
</script>

<style lang="less" scoped>
.insure-clause-detail{
    width: 100%;
    height:100%;
    div.title{
        text-align: center;
        color: #454545;
        line-height: 23px;
        // height: 43px;
        padding: 10px 45px;
        box-sizing: border-box;
    }
    .image{
        width: 100%;
        img{
            border: none;
            outline: none;
            width: 100%;
        }
    }
}
</style>
