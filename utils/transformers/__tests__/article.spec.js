const articleTransformer = require('../article');

const mockArticle = {
  Title: 'Shadowplays: Tod Browning\'s "Dracula" and Karl Freund\'s "The Mummy"',
  Author: 'Le Cain, Maximilian',
  Publication: '16:9 filmtidsskrift',
  Year: '2005',
  'DOI/Stable URL': 'N/A',
  'Free Online Copy': 'http://www.16-9.dk/2005-04/side11_inenglish.htm',
  'MLA 8 Citation': 'Le Cain, Maximilian. "Shadowplays: Tod Browning\'s \'Dracula\' and Karl Freund\'s \'The Mummy\'." 16:9 filmtidsskrift, vol. 3, no. 11, Apr. 2005, www.16-9.dk/2005-04/side11_inenglish.htm.',
  'Reprinted In': 'N/A',
  MUSE: 'No',
  JSTOR: 'No',
  'Horror Lex Summary': 'Coming Soon',
  Films: 'Dracula (1931)\nThe Mummy (1932)',
  Tags: 'vampires, Dracula, mummy, classics',
  Rec: '',
  Photo: '169F0011',
};

describe('articleTransformer', () => {
  it('should match the snapshot', () => {
    expect(articleTransformer(mockArticle)).toMatchSnapshot();
  });
});
