<%include header %>
<html>
  
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script type="text/javascript"> 
        $(document).ready(function () {
            $('#user-submit').click(function () {
                var payload = {
                    ID: $('#ID').val(),
                    Artist: $('#artist').val(),
                    MemberName: $('#member-name').val(),
                    Instrument: $('#instrument').val()
                 };

                console.log(payload);

		 $.ajax({
                    url: "/enterMembers",
                    type: "POST",
                    contentType: "application/json",
                    processData: false,
                    data: JSON.stringify(payload),
                    complete: function (data) {
                        $('#output').html(data.responseText);
                    }
                });
            });
        });

    </script>
  
<body>
	<h3>Enter a band member into the database:</h3>
	 ID: <input id="ID" type="text" /> <br />
         Artist: <input id="artist" type="text" /> <br />
         Member: <input id="member-name" type="text" /> <br />
         Instrument: <input id="instrument" type="text" /> <br />
         <input id="user-submit" type="submit" />
         <p id="output"></p>
<%include footer %>
</body>
</html>
