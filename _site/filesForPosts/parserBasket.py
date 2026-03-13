import re
import urllib.request
import io
from bs4 import BeautifulSoup

base_url = "http://www.basketball-reference.com"
file_name = "players"
separator = "#"

def getPlayers(character):

    url = "{0}/players/{1}".format(base_url, character)
    u = urllib.request.urlopen(url, data = None)
    f = io.TextIOWrapper(u,encoding='utf-8')
    dataString = f.read()

    #with open("http://www.basketball-reference.com/players/a") as playersFile:
        #dataBinary = playersFile.read()
        #dataString = str(dataBinary)

    namesRegex = r'(?i)<tr[^>]*>\s*<td[^>]*>\s*<a\s+href="([^"]+)"\s*>([^<]+)</a>'

    pattern = re.compile(namesRegex)

    namesList = []
    linkMap = {}

    for match in pattern.finditer(dataString):
        try:
            href = "{0}{1}".format(base_url, match.group(1))
            name = match.group(2)

            namesList.append(name)
            linkMap[name] = href

            print("{0} -> {1}".format(name, href))
            getPlayerInfo(href, character)
        except:
            pass
        
    #print("{0} -> {1}".format(namesList[0], linkMap[namesList[0]]))
    #getPlayerInfo(linkMap[namesList[0]])

def getPlayerInfo(url, character):

    try:
        infos = ""
        
        regex_intraTD = r'(?i)<td[^>]*>\s*([^<]*)<\/td>'
        pattern = re.compile(regex_intraTD)

        u = urllib.request.urlopen(url, data = None)
        f = io.TextIOWrapper(u,encoding='utf-8')
        dataString = f.read()
        
        soup = BeautifulSoup(dataString, "html.parser")


        # READING MAIN INFORMATIONS

        info_box = soup.find('div', id='info_box')
        main_info = info_box.find_all("div", class_="person_image_offset")
        
        if not main_info:
            print("NONE")
            main_info = info_box
        else:
            main_info = main_info[0]

        all_main_info_p0 = main_info.find_all("p", class_="margin_top")[0]

        infos = "{0}{1}{2}".format(infos, separator, all_main_info_p0.span.string)

        all_main_info_p1 = main_info.find_all("p", class_="padding_bottom_half")[0]
        
        cont = 0
        for p_text in all_main_info_p1.descendants:
            
            if cont == 2 or cont == 5:
                regex_noSymbols = re.compile('[^a-zA-Z]')
                p_text = regex_noSymbols.sub('', p_text)
                
                #print("{0} --- {1}".format(cont, p_text))
                infos = "{0}{1}{2}".format(infos, separator, p_text)
                
            if cont == 9 or cont == 12:
                regex_noSymbols = re.compile('[^0-9\-]')
                p_text = regex_noSymbols.sub('', p_text)
                
                #print("{0} --- {1}".format(cont, p_text))
                infos = "{0}{1}{2}".format(infos, separator, p_text)

                
            cont = cont + 1

        # NOW READING EACH TOTAL FROM THE TABLES

        all_tfoot = soup.find_all("tfoot")
        for tfoot in all_tfoot:
            
            tr = tfoot.tr #only the first tr
            i = 0
            
            for td in tr.descendants:

                tdstr = str(td)
                if i > 0:
                    for match in pattern.finditer(tdstr):
                        value = match.group(1)
                        infos = "{0}{1}{2}".format(infos, separator, value)
                        #print("{0} --- {1}".format(i, tdstr))
                i = i + 1

        full_file_name = "{0}{1}{2}".format(file_name, character, ".txt")
        file = open(full_file_name, 'a')

        infos = infos.replace('\n', ' ').replace('\r', '') + "\n"
        
        file.write(infos)

        file.close()
    except:
        return 0
    
if __name__ == "__main__":
    for one in range(97,123):
        print(str(chr(one)))
        getPlayers(str(chr(one)))


    #getPlayers("a")
