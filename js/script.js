$(function () {

	var API_KEY = 'AIzaSyCUdtRALpy3EZXLvedCXBs1xfYnuTR-NJk';
	var ID = '011182693488101119047:jto1b_niqya';

	var url = function (param) {
		return 'https://www.googleapis.com/customsearch/v1?key=' + API_KEY + '&cx=' + ID + '&q="' + param + '"';
	}

	var getNumResults = function(query) {
		
		var response = $.ajax({
			type: "GET",
			url: url(query),
			dataType: "json",
			processData: false,
			async: false,
		}).responseText;
		
		var jsonObject = JSON.parse(response);

		return parseInt(jsonObject.searchInformation.totalResults);
	}

	var calcProbability = function(big, sma) {
		return Math.round(big / (big+sma) * 100);
	}

	var withHyphen = function(str1, str2){
		var vowels = ["a", "e", "i", "o", "u", "y", "ä", "ö"];
		var lastChar = str1.substr(str1.length-1, str1.length);
		console.log(lastChar);
		var hyphen = false;
		if(lastChar == str2.substr(0, 1)){
			for(var i = 0; i < vowels.length; i++){
				if(lastChar == vowels[i]){
					withHyphen = true;
					break;
				}
			}
		}
		return hyphen;
	}

	var initCalculation = function() {

		var isSeparate;
		var probability;

		var word1 = $('#word1').val();
		var word2 = $('#word2').val();

		//var T;
		//withHyphen(word1, word2) ? T = getNumResults(word1 + '-' + word2) : T = getNumResults(word1 + word2);
		var T = getNumResults(word1 + word2);
		var S = getNumResults(word1 + ' ' + word2);

		console.log("yhteen " + T);
		console.log("erikseen " + S);

		//var T = 5350;
		//var S = 15000;

		if(T > S) {
			probability = calcProbability(T, S);
			isSeparate = 'yhteen';
		} else if (T < S) {
			probability = calcProbability(S, T);
			isSeparate = 'erikseen';
		} else {
			isSeparate = null;
		}

		//unless probability is higher than 65 %
		//we cannot really be sure about the result
		if(isSeparate != null && probability > 65) {
			$('#yes-result-wrapper').show();
			$('#probability').html(probability);
			$('#mode').html(isSeparate);
		} else {
			$('#no-result-wrapper').show();
		}
	}

	$('#calculate-propability').on('click', function() {
		$('#result div').hide();
		initCalculation();
	});

});
