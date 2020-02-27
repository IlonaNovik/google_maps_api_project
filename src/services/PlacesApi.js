class PlacesApi {
    PlacesArray = {
        places: []
    }

    getPlaces(){
        return this.PlacesArray.places;
    }

    addPlace(id, lat, lng, name, imageUrls){
        this.PlacesArray.places.push(
            {
                id: id,
                lat: lat,
                lng: lng,
                name: name,
                imageUrls: imageUrls
            }
        )
    }

    searchIndex(id){
        for (var i=0; i < this.PlacesArray.places.length; i++) {
            if (this.PlacesArray.places[i].id === id) {
                return i;
            }
        }
    }

    deletePlace(id){
        let i = this.searchIndex(id)
        this.PlacesArray.places.splice(i, 1);
    }
}

let placesApiObject = new PlacesApi();

export default placesApiObject;