from api.models import Car, Branch, CarType
import csv





def run():
    
    path = "csv_files/"
    
    with open(path+'car/cars.csv') as f:
       
        reader = csv.reader(f)
        next(reader)

        # Uncomment if tables doesn't need to be deleted
        #Car.objects.all().delete()

        for r in reader:
            #branch and type are foreign keys so create instances for both models
            branch = Branch.objects.get(BranchID=int(r[8]))
            type = CarType.objects.get(TypeID=int(r[9]))


            _, is_created = Car.objects.get_or_create(
                CarID=int(r[0]),
                Manufacturer=r[1],
                Model=r[2],
                FuelType=r[3],
                Colour=r[4],
                LicencePlate=r[5],
                Status=r[6],
                Mileage=r[7],
                Branch=branch,       #
                Type=type         #

            )

            

