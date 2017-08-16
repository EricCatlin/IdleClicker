module.exports = {
  Node: function (node) {
    if (!node) return "Node is missing";
    if (!node.properties) return "Node is missing properties object";
    if (node.properties.title.length > 40) return "Title too long";
    if (node.properties.title.length == 0) return "Title too short";
    if (node.properties.description && node.properties.description.length > 140) return "Description too long";
    if ((!node.properties.description || node.properties.description.length == 0) && (!node.properties.image_url || node.properties.image_url.length == 0)) return "Description or Image required";
    return null;
  },

  Note: function (node) {
    if (!node) return "Node is missing";
    if (!node.properties) return "Node is missing properties object";
    if (node.properties.description!= null && node.properties.description.length > 140) return "Description too long";
    if (node.properties.description.length == 0 && (!node.properties.image_url || node.properties.image_url.length == 0)) return "Description or Image required";
    return null;

  }
}