var Tiro = (function()
{
	//exposed methods:

	var create = function()
	{
		var obj = Object.create(def);
		obj.radius = 3;
		obj.color = '#fff600';               
		obj.pos = Vec2D.create(0, 0);
		obj.vel = Vec2D.create(0, 0);
		obj.blacklisted = false;

		return obj;
	};

	// Definição de tiro:
	var def =
	{
		radius: null,
		color: null,
		pos: null,
		vel: null,
		blacklisted: null,

		atualiza: function()
		{
			this.pos.add(this.vel);
		},

		reinicia: function()
		{
			this.blacklisted = false;
		}
	};

	return {create:create};
}());