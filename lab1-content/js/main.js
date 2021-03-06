jQuery.fn.updateWithText = function(text, speed) {
	var dummy = $('<div/>').html(text);

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed/2, function() {
				//done
			});
		});
	}
}

function roundVal(temp) {
	return Math.round(Number(temp));
}

function c2f(c) {
	return Number(c) * 1.8 + 32;
}

jQuery(document).ready(function($) {
    (function updateTemp() {
		$.getJSON("http://173.17.168.19:8083/lab1/temperature/latest", {}, function(json, status) {
        	current_temperature = json.temp;
    		if (current_temperature == null) {
        		$('.current_temperature').updateWithText("Data Unavailable.",300);
    		} else {
        		$('.current_temperature').updateWithText(current_temperature + ' °' + temp_reading,300);
    		}
		}).fail(function() {
			$('.current_temperature').updateWithText("Error Reaching Endpoint.",300);
		});

        setTimeout(function() {
            updateTemp();
        }, 1000);
    })();

	(function updateTempList() {
		$.getJSON("http://173.17.168.19:8083/lab1/temperature", {}, function(json, status) {
        	var tempList = {};
			for (var i in json.temps) {
				var temp = json.temps[i];
				tempList[i] = {
					'temp':temp
				};
			}

			// TODO
			// we will have to update the table here, however we make it.
			//
			// we can parse through the temp data with:
			// for (var i int tempList) {
			// 		var temp = tempList[i].temp
			// }
		}).fail(function() {
			$('.current_temperature').updateWithText("Error Reaching Endpoint.",300);
		});

        setTimeout(function() {
            updateTempList();
        }, 1000);
    })();
});
