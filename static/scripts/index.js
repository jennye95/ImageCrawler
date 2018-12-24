
function onURLSubmit()
{
	/**
	 * Event handler when user submit a crawl request.
	 */
	var inputEl = document.getElementById("txturl");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function onResponseReceived() {
		if (this.readyState == 4 && this.status == 200)
		{
			if(this.responseText === "-1")
			{
				alert("Failed obtaining image from " + inputEl.value + ", please try again.");
			}
			else
			{
				onImageUrlReceived(this.responseText)
			}
		}
	};
	xhttp.open("POST", "get_image_urls", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("inputURL=" + inputEl.value);
}

function onImageUrlReceived(urls)
{
	/**
	 * When image URLs returned.
	 * parameters:
	 * 	urls - A semicolon delimited string for all image URLs.
	 */
	var imgUrls = urls.split(";");
	var containerDiv = document.getElementById("divImageContent");
	containerDiv.innerHTML = "";

	// Populate image elements.
	for(var i = 0; i < imgUrls.length; i++)
	{
		// Create an anchor tag wrapper.
		var anchorTag = document.createElement("a");
		anchorTag.href = imgUrls[i];
		anchorTag.download = "";
		anchorTag.className = "imgContent";

		// Create the image tag.
		var imgTag = document.createElement("img");
		imgTag.src = imgUrls[i];

		// Put the DOMs inside the container.
		anchorTag.appendChild(imgTag);
		containerDiv.appendChild(anchorTag);
	}
}

window.addEventListener("load", function onLoaded()
{
	/**
	 * Entry point.
	 */
	var submitButton = document.getElementById("btnsubmit");
	submitButton.addEventListener("click", onURLSubmit);
});