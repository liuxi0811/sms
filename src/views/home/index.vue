<template>
 <div id="app-main">
     
     <div class="main">
		<h1 style="color:white;margin-bottom:0;">欢迎访问学员管理系统</h1>
		<div id="layer02" class="layer" style="height:12%;">
			<div id="layer02_01" style="width:20%;">
				<div class="layer02-data">
					<span style="font-size:16px;">教师人数：20</span>
					<span style="font-size:16px;">人</span>
				</div>
				<canvas width="200" height="100"></canvas>
			</div>
			<div id="layer02_02" style="width:20%;">
				<div class="layer02-data">
					<span style="font-size:16px;">班主任人数：10</span>
					<span style="font-size:16px;">人</span>
				</div>
				<canvas width="200" height="100"></canvas>
			</div>
			<div id="layer02_03" style="width:22%;">
				<div class="layer02-data">
					<span style="font-size:16px;">已就业学员：1001</span>
					<span style="font-size:16px;">人</span>
				</div>
				<canvas width="200" height="100"></canvas>
			</div>
			<div id="layer02_04" style="width:12%;">
				<div class="layer02-data">
					<span style="font-size:26px;">50</span>
					<span style="font-size:16px;">PB</span>
				</div>
				<canvas width="120" height="100"></canvas>
			</div>
			<div id="layer02_05" style="width:12%;">
				<div class="layer02-data">
					<span style="font-size:26px;">25</span>
					<span style="font-size:16px;">个</span>
				</div>
				<canvas width="120" height="100"></canvas>
			</div>
			<div id="layer02_06" style="width:12%;">
				<div class="layer02-data">
					<span style="font-size:26px;">5</span>
					<span style="font-size:16px;">个</span>
				</div>
				<canvas width="120" height="100"></canvas>
			</div>
		</div>
		<div id="layer03" class="layer" style="height:40%;">
			<div id="layer03_left" style="width:48%;" class="layer03-panel">
				<div id="layer03_left_label01" class="layer03-left-label">教师与学员占比</div>
				<!--
				<div id="layer03_left_label02" class="layer03-left-label">(左)在线数量 (右)上线率</div>
				-->
				<div id="layer03_left_01" class="layer03-left-chart" style="width:16%;">
					<canvas width="100" height="200" style="margin:30px 0 0 20px;"></canvas>
				</div>
				
				<div id="layer03_left_02" class="layer03-left-chart" style="width:80%;"></div>
				<!--
				<div id="layer03_left_03" class="layer03-left-chart" style="width:80%;"></div>
				-->
			</div>
			<div id="layer03_right" style="width:50%;" class="layer03-panel">
				<div id="layer03_right_label">学员年级占比</div>
				<div id="layer03_right_chart01" class="layer03-right-chart">
					<canvas width="130" height="150" style="margin:40px 0 0 20px;"></canvas>
					<div class="layer03-right-chart-label">往届</div>
				</div>
				<div id="layer03_right_chart02" class="layer03-right-chart">
					<canvas width="130" height="150" style="margin:40px 0 0 20px;"></canvas>
					<div class="layer03-right-chart-label">应届</div>
				</div>
				<div id="layer03_right_chart03" class="layer03-right-chart">
					<canvas width="130" height="150" style="margin:40px 0 0 20px;"></canvas>
					<div class="layer03-right-chart-label">大一/大二</div>
				</div>
			</div>
		</div>
		<div id="layer04" class="layer" style="height:30%;">
			<div id="layer04_left" class="layer04-panel">
				<div id="layer04_left_label" class="layer04-panel-label">往年就业情况</div>
				<div id="layer04_left_chart" class="layer04-panel-chart"></div>
			</div>
			<div id="layer04_right" class="layer04-panel">
				<div id="layer04_right_label" class="layer04-panel-label">
					<span>就业情况/</span><span style="color:#00A09A;">近一年</span>
				</div>
				<div id="layer04_right_chart" class="layer04-panel-chart"></div>
			</div>
		</div>
	</div>
      
 </div>
</template>

<script>
import $ from 'jquery';
import monitor from '@/assets/monitor.js'
export default {
 data () {
 return {
 }
 },
mounted: function(){
    monitor.renderLegend();

		//饼状图
		monitor.renderChartBar01();
		//renderChartBar02();

		//学员年级占比
		monitor.renderLayer03Right();

		//往年就业情况
		monitor.renderLayer04Left();

		//近一年就业情况
		monitor.renderLayer04Right();
  },
 components: {},

 methods: {}
}
</script>

<style scoped>
/* .app-home{background-image: url(../../assets/images/nybj.png);background-size:100% 100%;font-weight:bold;font-family:苹方;overflow: hidden;} */
div{
    text-align: center;
}
.main{width:100%;height:698px;position:relative;margin:auto;background-image: url(../../assets/images/nybj.png);background-size:100% 100%;overflow: hidden;padding: 0;}
	div{border:0px solid white;margin:1px;}
	.layer{position:relative;width:100%;}
	#app-main{margin: 0;}
	#layer01 img{text-align: center;display: block;height: 35px;padding-top: 35px;margin: auto;}
	#layer02 > div{height:100%;float:left;position:relative;}
	.layer02-data{position: absolute;width: auto;height: 100px;color: white;top: 45px;left: 65px;}
	.layer03-panel{height:100%;position:relative;float:left;}
	.layer03-left-label{position:absolute;}
	#layer03_left_label01{top:10px;left:10px;color:white;height:20px;width:200px;font-weight: bold;}
	#layer03_left_label02{right:10px;top:10px;color:#036769;height:20px;width:200px;}
	.layer03-left-chart{position:relative;float:left;height:100%;}
	#layer03_right_label{position:absolute;top:10px;left:10px;color:white;height:20px;width:100px;}
	.layer03-right-chart{position:relative;float:left;height:100%;width:32%;}
	.layer03-right-chart-label{color: white;text-align: center;position: absolute;bottom: 60px;width: 100%;}
	.layer04-panel{position:relative;float:left;height:100%;width:48%;}
	.layer04-panel-label{width:100%;height:15%;color:white;padding-top:5px;}
	.layer04-panel-chart{width:100%;height:85%;}
</style>