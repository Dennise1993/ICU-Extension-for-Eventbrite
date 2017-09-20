//Singleton Pattern
var svgCanvas_singleton = (function () {
    var instance;
 
    function createCanvas() {
        var svgCanvas = new SvgEditorEmbedded(window.frames['svgEditor']);
        return svgCanvas;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createCanvas();
            }
            return instance;
        }
    };
})();

var SAMPLE_SVG_STRING = '<svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">\n' +
    ' <!-- Created with SVG Editor - http://github.com/mzalive/SVG Editor/ -->\n' +
    ' <g>\n' +
    '  <title>background</title>\n' +
    '  <rect fill="#fff" id="canvas_background" height="402" width="582" y="-1" x="-1"/>\n' +
    '  <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">\n' +
    '   <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>\n' +
    '  </g>\n' +
    ' </g>\n' +
    ' <g>\n' +
    '  <title>Layer 1</title>\n' +
    '  <path id="svg_1" d="m186.5825,162.04691l79.06753,0l24.43247,-73.71964l24.43249,73.71964l79.06751,0l-63.96685,45.56072l24.43374,73.71964l-63.96688,-45.56197l-63.96687,45.56197l24.43374,-73.71964l-63.96688,-45.56072z" stroke-width="1.5" stroke="#000" fill="#ff0000"/>\n' +
    ' </g>\n' +
    '</svg>'

//TO DO: In the future, obj will be the json Object fetched through ajax-*9+9
var json_obj = [{"name": "item_1", "content": SAMPLE_SVG_STRING}, 
                {"name": "item_2", "content": SAMPLE_SVG_STRING},
                {"name": "item_3", "content": SAMPLE_SVG_STRING}];

function init_embed() {
      svgCanvas_singleton.getInstance();
}

	function loadSvg(name) {
	    var svg_content = null;
	    for(i in json_obj) {
	        if(json_obj[i].name === name) {
	            svg_content = json_obj[i].content;
	            break;
	        }
	    }

		    svgCanvas_singleton.getInstance().setSvgString(svg_content)(function (d, e) {
		        console.log("load successfully: "+d, e);
		    });

	}

	function addTemToBar(i) {
        $(".side-form-content").
            append("<div class='radio svg-entity'><label><p class='svg-name'>"+ json_obj[i].name +"</p><input type='radio' name='optradio'>"+json_obj[i].content+"</label></div>");
            
        $(".side-form-content").find("input").eq(i).attr("id", json_obj[i].name);

		$(".side-form-content").find("svg").eq(i).attr({
		    "viewBox": "0 0 580 400",
		    "preserveAspectRatio": "xMidYMid meet",
		    "width": "80%",
		    "height": "80%"});

	}


	function renderTemList() {
		console.log(json_obj);
        //render svg lists in left bar
        for(i in json_obj) {
        	addTemToBar(i);
        };
	}

    /*
    TO DO: GET TEMPLATES FROM SERVER
    */
    //show template list on the left side of the bar
    function showTemFir() {
        renderTemList();
        //check the first svg
        $(".side-form-content").find("input").first().attr(
            "checked","checked"
        );
        //show the hided svg editor
        $("#svgEditor").show();
    }

    function addFooterBtn() {
        $(".footer-buttons-right").append(btnDwld, btnEmPrShp);
    }

    function addActionBar() {
        //console.log("add bar btns");
        $(".sidebar-action").show();
        $(".sidebar-buttons").append(btnSaveTem, btnSaveAs, btnDelTem);
    }

    function addNewTem(svg_name) {
        //get new templat object 
	    svgCanvas_singleton.getInstance().getSvgString()(function handleSvgData(d, e) {
	        if (e) {
	            console.log('error ' + e);
	        }
	        else {
	            //console.log("get svg content successfully"+d);
	            console.log('The exported SVG string:\n\n' + d);    
	            json_obj.push({"name": svg_name, "content": d});    

	            //render new template on left bar
	            addTemToBar(json_obj.length-1);       
	        }

	    });

        
    }


//var svgEditor = "<iframe src='svg-editor/index.html' width='900px' height='600px' id='svgEditor' onload='init_embed();'></iframe>";