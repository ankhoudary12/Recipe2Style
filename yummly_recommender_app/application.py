import flask
import pandas as pd

recipes_df=pd.read_pickle('final_recipes_df.pickle')
#sims_df=pd.read_hdf('sims_df.hdf','sims_df')


def send_recipes(recipe, cuisine, number=9):


    def find_nearest_recipes(recipe, cuisine ,number=10):

        from sklearn.metrics.pairwise import euclidean_distances

        import jellyfish

        def get_closest_match(x, list_strings):

            best_score= 0
            best_match=None

            for title in list_strings:

                current_score=jellyfish.jaro_winkler(x, title)

                if current_score > best_score:
                    best_score = current_score
                    best_match = title

            return best_match

        recipe = get_closest_match(recipe, recipes_df.index)

        flavor_profile_df=recipes_df[['bitter','meaty','piquant','salty','sour','sweet','recipe_score','cuisine_y']]

        dists=euclidean_distances(flavor_profile_df[(flavor_profile_df['cuisine_y']==cuisine)|(flavor_profile_df.index==recipe)].drop('cuisine_y',axis=1))

        sims_df=pd.DataFrame(dists)

        sims_df.index=flavor_profile_df[(flavor_profile_df['cuisine_y']==cuisine)|(flavor_profile_df.index==recipe)].index

        sims_df.columns=flavor_profile_df[(flavor_profile_df['cuisine_y']==cuisine)|(flavor_profile_df.index==recipe)].index

        matching_recipes=sims_df.join(recipes_df[recipes_df['cuisine_y']==cuisine], how='inner')

        final_recipes=recipes_df.join(matching_recipes[recipe].sort_values()[1:number+1], how='inner')

        return final_recipes



    def pack_recipes(df):
            '''Will take resuls of finding nearest bars and return a list of bar dictionaries containing relevant info'''

            import operator

            recipes=[]

            for index, row in df.iterrows():
                a=row.index
                a={}
                a['name']=row['full_name']
                a['image']=row['image']
                a['meaty']=row['meaty']
                a['piquant']=row['piquant']
                a['salty']=row['salty']
                a['sweet']=row['sweet']
                a['sour']=row['sour']
                a['yummly_url']=row['yummly_url']
                a['recipe_url']=row['recipe_url']
                a['cuisine']=row['cuisine_y']
                a['protein']=row['protein']
                a['carbs']=row['carbs']
                a['fat']=row['fat']
                a['sugar']=row['sugar']
                a['sodium']=row['sodium']
                a['calories']=row['calories']


                recipes.append(a)


            return recipes

    return pack_recipes(find_nearest_recipes(recipe, cuisine, number))

#---------- URLS AND WEB PAGES -------------#

# Initialize the app
application = flask.Flask(__name__)

# Homepage
@application.route("/")
def viz_page():
    """
    Homepage: serve our visualization page, awesome.html
    """
    with open("index.html", 'r') as viz_file:
        return viz_file.read()


@application.route("/recommend", methods=["GET","POST"])
def score():
    """
    When A POST request with json data is made to this uri,
    Read the example from the json, get similar bars, and
    send it with a response
    """

    # Get decision score for our example that came with the request
    data = flask.request.json
    print(data)
    recipe = data["example"][0]
    cuisine= data["example"][1]
    print(recipe)
    print(cuisine)
    recipes = send_recipes(recipe,cuisine)
    print(recipes)
    # Put the result in a nice dict so we can send it as json
    results = {"score": recipes}
    return flask.jsonify(results)


if __name__ == "__main__":
  application.run()
# application.run(host='0.0.0.0')
# application.run(debug=True)
