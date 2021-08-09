import React from 'react'

const Trafikverket = () => {

    var Stations = new Array();
    $(document).ready(function () {
        $.support.cors = true; // Enable Cross domain requests
        try {
            $.ajaxSetup({
                url: "https://api.trafikinfo.trafikverket.se/v2/data.json",
                error: function (msg) {
                    if (msg.statusText == "abort") return;
                    alert("Request failed: " + msg.statusText + "\n" + msg.responseText);
                }
            });
        }
        catch (e) { alert("Ett fel uppstod vid initialisering."); }

        // Create an ajax loading indicator
        var loadingTimer;
        $("#loader").hide();
        $(document).ajaxStart(function () {
            loadingTimer = setTimeout(function () {
                $("#loader").show();
            }, 200);
        }).ajaxStop(function () {
            clearTimeout(loadingTimer);
            $("#loader").hide();
        });

        // Load stations
        PreloadTrainStations();
    });

    function PreloadTrainStations() {
        // Request to load all stations
        var xmlRequest = "<REQUEST>" +
                            // Use your valid authenticationkey
                            "<LOGIN authenticationkey='yourAuthenticationKey'/>" +
                            "<QUERY objecttype='TrainStation' schemaversion='1'>" +
                                "<FILTER/>" +
                                "<INCLUDE>Prognosticated</INCLUDE>" +
                                "<INCLUDE>AdvertisedLocationName</INCLUDE>" +
                                "<INCLUDE>LocationSignature</INCLUDE>" +
                            "</QUERY>" +
                         "</REQUEST>";
        $.ajax({
            type: "POST",
            contentType: "text/xml",
            dataType: "json",
            data: xmlRequest,
            success: function (response) {
                if (response == null) return;
                try {
                    var stationlist = [];
                    $(response.RESPONSE.RESULT[0].TrainStation).each(function (iterator, item)
                    {
                        // Save a key/value list of stations
                        Stations[item.LocationSignature] = item.AdvertisedLocationName;
                        // Create an array to fill the search field autocomplete.
                        if (item.Prognosticated == true)
                            stationlist.push({ label: item.AdvertisedLocationName, value: item.LocationSignature });
                    });
                    fillSearchWidget(stationlist);
                }
                catch (ex) { }
            }
        });
    }

    

    return (
        <div>

        </div>
    )
}

export default Trafikverket
