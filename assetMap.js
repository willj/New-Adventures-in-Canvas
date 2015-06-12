/*	Assumes each sprite sheet is ordered vertically in the image, with animation states horizontally in the same row
 *	Each state within a sheet should be the same size
 *	But each row could be a different size
 *	Could possibly do with adding a hit area width/height
 */

var assetMap = [];

assetMap.push({
	fileName: "doublecircle2.png",
	sprites: [
			{
				name: "yellowCircle",
				startX: 0,
				startY: 0,
				width: 50,
				height: 50,
				states: {
					initial: [0,"initial"],
					flash: [1,0,1,0,"initial"]
				}
			},
			{
				name: "redCircle",
				startX: 0,
				startY: 50,
				width: 50,
				height: 50,
				states: {
					initial: [0,"initial"],
					flashAndDie: [1,0,1,0,1,0,1,0,"die"]
				}
			}
		]
});

assetMap.push({
	fileName: "pidge.png",
	sprites: [
		{
			name: "pidge",
			startX: 0,
			startY: 0,
			width: 150,
			height: 148
		}
	]
});