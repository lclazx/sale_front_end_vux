<template>
<div>
    <Row><Button>马上享受员工折扣！</Button></Row>

    <Row>
        <Col span="8">项目名称</Col>
        <Col span="16">
        <div>{{project.name}}</div>
        </Col>
    </Row>
    <Row>
        <Col span="8">单价</Col>
        <col span="16">{{project.price}}</Col>
    </Row>
    <Row>
        <Col span="8">面积</Col>
        <Col span="16">{{project.area}}</Col>
    </Row>
    <Row>
        <Col span="8">联系我：</Col>
        <Col span="16"><a href="tel:13570437810">{{sale.phone}}</a></Col>
    </Row>
    <Row>
        <Col span="8">加好友:</Col>
        <Col span="16"><img style="height:64px; width:64px" :src="sale.qrcode"/></Col>
    </Row>
</div>
</template>

<script>
export default {
    props: ["project", "sale"],
};
</script>

<style>
</style>
