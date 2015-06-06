// a way to splice an array using the smallest number of splice commands possible with any given set of indexes
// may not need it, but if splicing individual elements turns out to be slow, this might help.

// list would be built up in an update, adding any index of actors that has been killed and needs to be removed
// then run this function splicing actors based on groupStart and numInGroup

var list = [4,5,6,13,16,17,19,21];

var count = 0;
var lastNumber = -1;
var groupStart = -1;
var numInGroup = 0;

for (var i = 0; i < list.length; i++){	
	if (lastNumber < 0){
		lastNumber = list[i];
		groupStart = list[i];
		numInGroup += 1;	
	} else {
		if (lastNumber + 1 === list[i]){
			// consecutive numbers, add it to the group
			lastNumber = list[i];
			numInGroup += 1;		
		} else {
			console.log("splice: " + groupStart + ", " + numInGroup);
			lastNumber = list[i];
			groupStart = list[i];
			numInGroup = 1;
		}
		
		if (i === (list.length - 1)){
			console.log("splice: " + groupStart + ", " + numInGroup);
		}
	}
}