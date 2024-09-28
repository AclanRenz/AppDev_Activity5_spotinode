 // Modal elements
 const modal = document.getElementById('songModal');
 const addSongBtn = document.getElementById('addSongBtn');
 const closeModal = document.getElementsByClassName('close')[0];


    // Show modal when "Add Music" button is clicked
    document.getElementById('addSongBtn').onclick = function() {
        document.getElementById('songModal').style.display = 'block';
    }

    // Close modal when the user clicks on <span> (x)
    document.getElementById('close').onclick = function() {
        document.getElementById('songModal').style.display = 'none';
    }

    // Close modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == document.getElementById('songModal')) {
            document.getElementById('songModal').style.display = 'none';
        }
    }
